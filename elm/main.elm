import Window (dimensions)
import Mouse
import Maybe (maybe, Just, Nothing)
import Time (every)
import Automaton
import JavaScript
import JavaScript (JSString, JSArray, JSNumber)
import Json
import Http
import Dict
import GameOfLife as GameOfLife
import Graphics.Input (checkbox)

placeholder w h col text = color col <| container w h middle <| plainText text
repeat a n = map (\_ -> a) [1..n]
-- TODO: move to Common
percent x p = (x * p) `div` 100
remove e l = case l of
    (x::xs) -> if (x == e)
               then xs
               else x::(remove e xs)
    [] -> []

-- http://colorschemedesigner.com/#0p32P1B6p6q6q
palColor1 = rgb 51 49 48
palColor12 = rgb 71 69 68
palColor21 = rgb 30 27 32
palColor22 = rgb 55 54 56
palColor31 = rgb 71 71 68
palColorAccent = rgb 255 102 0
palColorBlink = rgba 222 222 222 0.5

golSpeed = 500
sequencerSteps = 16
sequencerSpeed = 300

foreign import jsevent "provideHost"
    (Json.fromString "")
        jsHost : Signal JSString

foreign import jsevent "providePresetUrl"
    (Json.fromString "")
        presetUrl : Signal JSString

host = lift Json.toString jsHost
presetRequest = Http.sendGet <| lift Json.toString presetUrl

data Preset = Preset String String [(Int, Int)]

getPoint asocList =
    case asocList of
        (_, Json.Number x)::[(_, Json.Number y)] -> Just (x,y)
        _ -> Nothing
getValue obj =
    case obj of
        Json.Object a -> a
        _ -> Json.Null
handleResponse res =
    case res of {
        Http.Success obj -> Json.fromString obj
    ;   Http.Waiting -> Json.Null
    ;   Http.Failure _ _ -> Json.Null }
presetSignal =  let deserializePattern preset = map (\obj ->getPoint <| Json.fromJSObject obj <| maybe Nothing)
                                                       (Dict.lookup "pattern" preset)
                    deserializeName preset = Dict.lookup "name" preset
                    deserializeSn preset = Dict.lookup "sn" preset
                    deserializePreset preset = let presetObj = handleResponse preset
                                              in Preset
                                                    (deserializeSn presetObj)
                                                    (deserializeName presetObj)
                                                    (deserializePattern presetObj)
                in lift deserializePreset presetRequest
patternSignal = lift (\(Preset _ _ pattern) -> pattern) presetSignal

--klikanie
layoutDimensions = lift (\(w, h) -> (w, h, (w * 7) `div` 8, (h * 7) `div` 8)) dimensions
seqMousePosition = lift2 (\(w, h, _, gameHeight) (mouseX, mouseY) ->
        ( mouseX - (w * 1) `div` 2 + (gameHeight `percent` 45), mouseY - (h * 1) `div` 16 - (gameHeight `percent` 1) ))
    layoutDimensions Mouse.position

-- TODO: extract cellSize, use seqView size
cellClickCoord =
    lift (\(x, y, gameHeight) -> let cellSize = (gameHeight `percent` 90) `div` sequencerSteps in
            (x `div` cellSize + 1, y `div` cellSize + 1) )
         <| sampleOn Mouse.clicks <| lift2 (\(x, y) (_, _, _, gameHeight) -> (x, y, gameHeight)) seqMousePosition layoutDimensions

--standard patterns
exploder = [(8,8), (7,9), (8,9), (9,9), (7,10), (9,10), (8,11)]
cycleExploder = [(8,8), (8,12), (6,8), (6,9), (6,10), (6,11), (6,12), (10,8), (10,9), (10,10), (10,11), (10,12) ]

golAutomaton =
    let fstep input stateGol =
            let out =
                case input of
                    [] -> GameOfLife.limit (GameOfLife.step stateGol) sequencerSteps
                    clickCoord::[] -> if GameOfLife.alive clickCoord stateGol
                                     then GameOfLife.fromList <| remove clickCoord <| GameOfLife.toList stateGol
                                     else GameOfLife.insert clickCoord stateGol
                    _ -> GameOfLife.fromList input
            in (GameOfLife.toList out, out)
        gol = GameOfLife.fromList cycleExploder
    in Automaton.state gol fstep

(golControl, golActive) = checkbox True
mainGol = Automaton.run golAutomaton <| patternSignal `merge`
                                        (lift (\cell -> [cell]) cellClickCoord) `merge`
                                        (keepWhen golActive [] <| lift (\_ -> []) <| every golSpeed)

castPointListToJSArray xs = JavaScript.fromList <| map (\(x,y) -> JavaScript.fromList [JavaScript.fromInt x, JavaScript.fromInt y]) xs
exportGol = lift castPointListToJSArray mainGol

sequencerAutomaton =
    let fstep input (stateGol, stateStep) =
        let (gol, step, new) =
            case input of
                [] -> (stateGol, (stateStep `mod` sequencerSteps) + 1, True)
                _  -> (input, stateStep, False)
        in ( (filter (\(x, _) -> x == step) gol, new), (gol, step) )
    in Automaton.state ([], 0) fstep

sequencerSignal = lift (\seq -> map (\(x,y) -> (x, sequencerSteps - y)) <| fst seq)
                    <| keepIf snd ([], True)
                    <| Automaton.run sequencerAutomaton
                    <| mainGol `merge` (lift (\_ -> []) <| every sequencerSpeed)

exportSequencer = lift castPointListToJSArray sequencerSignal

--gofCell=   ((filled (rgb 255 102 0) .) .) . rect
gofCell w h (x,y) =   filled palColorAccent <| rect w h (x,y)
--noCell =   ((filled (rgb 64 64 64) .) .) . rect
noCell w h (x,y)  = filled palColor31 <| rect w h (x,y)

synthCtrl w h = placeholder w h palColor22 "Sythesizer controls"
golCtrl w h = color palColor22 <| container w h middle <|
                (plainText "Gof controls") `above` (plainText "Active") `beside` golControl
presets w h presetName = placeholder w h palColor22 presetName

sequencer w h activeCells seqStep =
                let cellSize = toFloat(h)/sequencerSteps
                    coordinate x = cellSize*toFloat(x) - cellSize*0.5
                    grid = concatMap (\c -> zip (repeat c sequencerSteps) <| map coordinate [1..sequencerSteps])
                           <| map coordinate [1..sequencerSteps]
                    inactiveCells = map (noCell (cellSize*0.8) (cellSize*0.8)) <| grid
                    stepIndicator = filled palColorBlink <| rect cellSize h (coordinate seqStep, (h `div` 2))
                in
                    collage w h <|
                        inactiveCells ++
                        (stepIndicator ::
                        (map (gofCell (cellSize*0.8) (cellSize*0.8))
                            <| map (\(x,y) -> (coordinate x, coordinate y)) activeCells))

--                    <| run golAutomaton <| sampleOn clicks position

view (w, h, layoutWidth, gameHeight) (mouseX, mouseY) gol (Preset presetSn presetName presetPattern) seqColumn =
    let
        seqStep = case seqColumn of { [] -> (0-1); (x, _)::_ -> x}
        seqView = sequencer (percent gameHeight 90) (percent gameHeight 90) gol seqStep
    in layers [(color palColor1 <| container w h middle <|
                    color palColor21 <| container layoutWidth gameHeight middle <| (flow right
                        [
                            golCtrl (layoutWidth `percent` 12) (gameHeight `percent` 80),
                            spacer (layoutWidth `percent` 1) (gameHeight `percent` 80),
                            seqView,
                            spacer (layoutWidth `percent` 1) (gameHeight `percent` 80),
                            presets (layoutWidth `percent` 12) (gameHeight `percent` 80) presetName
                        ])
                    `above`
                    synthCtrl ( (layoutWidth `percent` 26) + (gameHeight `percent` 90) ) (gameHeight `percent` 8) ),
                asText (presetSn, w, h, mouseX, mouseY)]

main = lift5 view layoutDimensions cellClickCoord mainGol presetSignal sequencerSignal

foreign export jsevent "onGolStep"
    exportGol : Signal (JSArray (JSArray JSNumber ))

foreign export jsevent "onSequencerStep"
    exportSequencer : Signal (JSArray (JSArray JSNumber))