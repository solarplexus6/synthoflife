import Window (dimensions)
import Mouse (clicks,position)
import Maybe (mapMaybe)
import Time (every)
import Automaton
import JavaScript
import JSON as JSON
import HTTP(sendGet)
import GameOfLife as GameOfLife

clickLocations = foldp (:) [] (sampleOn clicks position)

placeholder w h col text = color col $ container w h middle $ plainText text
repeat a n = map (\_ -> a) [1..n]

-- http://colorschemedesigner.com/#0p32P1B6p6q6q
palColor1 = rgb 51 49 48
palColor12 = rgb 71 69 68
palColor21 = rgb 30 27 32
palColor22 = rgb 55 54 56
palColor31 = rgb 71 71 68
palColorAccent = rgb 255 102 0

golSpeed = 500
sequencerSteps = 16
sequencerSpeed = 200

foreign import jsevent "provideHost"
    (castStringToJSString "")
        jsHost :: Signal JSString

foreign import jsevent "providePresetUrl"
    (castStringToJSString "")
        presetUrl :: Signal JSString

host = lift castJSStringToString jsHost
presetSignal = sendGet $ lift castJSStringToString presetUrl

data Preset = Preset String String [(Int, Int)]

getPoint asocList =
    case asocList of
        (_, JsonNumber x):[(_, JsonNumber y)] -> Just (x,y)
        _ -> Nothing
getValue obj =
    case obj of
        JsonObject a -> a
        _ -> JSON.empty
handleResponse res =
    case res of {
        Success obj -> JSON.fromString obj
    ;   Waiting -> JSON.empty
    ;   Failure _ _ -> JSON.empty }
presetSignal =  let deserializePattern preset = mapMaybe (\obj ->getPoint $ JSON.toList $ getValue obj)
                                                       (JSON.findArray "pattern" preset)
                    deserializeName preset = JSON.findString "name" preset
                    deserializeSn preset = JSON.findString "sn" preset
                    deserializePreset preset = let presetObj = handleResponse preset
                                              in Preset
                                                    (deserializeSn presetObj)
                                                    (deserializeName presetObj)
                                                    (deserializePattern presetObj)
                in lift deserializePreset presetSignal
patternSignal = lift (\(Preset _ _ pattern) -> pattern) presetSignal
--type State = GameOfLife

--standard patterns
exploder = [(8,8), (7,9), (8,9), (9,9), (7,10), (9,10), (8,11)]
cycleExploder = [(8,8), (8,12), (6,8), (6,9), (6,10), (6,11), (6,12), (10,8), (10,9), (10,10), (10,11), (10,12) ]

golAutomaton =
    let fstep input stateGol =
            let gol =
                case input of
                    [] -> stateGol
                    _ -> GameOfLife.fromList input
                out = GameOfLife.limit (GameOfLife.step gol) sequencerSteps
            in (GameOfLife.toList out, out)
        gol = GameOfLife.fromList cycleExploder
    in init' gol fstep

mainGol = run golAutomaton $ patternSignal `merge` (lift (\_ -> []) $ every golSpeed)

foreign export jsevent "onGolStep"
    exportGol :: Signal (JSArray (JSTuple2 JSNumber JSNumber))

castPointListToJSArray xs = castListToJSArray $ map (\(x,y) -> castTupleToJSTuple2 (castIntToJSNumber x,castIntToJSNumber y)) xs
exportGol = lift castPointListToJSArray mainGol

sequencerAutomaton =
    let fstep input (stateGol, stateStep) =
        let (gol, step, new) =
            case input of
                [] -> (stateGol, (stateStep `mod` sequencerSteps) + 1, True)
                _  -> (input, stateStep, False)
        in ( (filter (\(x, _) -> x == step) gol, new), (gol, step) )
    in init' ([], 0) fstep

sequencerSignal = lift fst
                    $ keepIf snd ([], True)
                    $ run sequencerAutomaton
                    $ mainGol `merge` (lift (\_ -> []) $ every sequencerSpeed)

foreign export jsevent "onSequencerStep"
    exportSequencer :: Signal (JSArray (JSTuple2 JSNumber JSNumber))

exportSequencer = lift castPointListToJSArray sequencerSignal

--gofCell=   ((filled (rgb 255 102 0) .) .) . rect
gofCell w h (x,y) =   filled palColorAccent $ rect w h (x,y)
--noCell =   ((filled (rgb 64 64 64) .) .) . rect
noCell w h (x,y)  = filled palColor31 $ rect w h (x,y)

synthCtrl w h = placeholder w h palColor22 "Sythesizer controls"
golCtrl w h = placeholder w h palColor22 "GoL controls"
presets w h presetName = placeholder w h palColor22 presetName
sequencer w h activeCells =
                let cellSize = toFloat(w)/sequencerSteps
                    coordinate x = cellSize*toFloat(x) - cellSize*0.5
                    grid = concatMap (\c -> zip (repeat c sequencerSteps) $ map coordinate [1..sequencerSteps])
                           $ map coordinate [1..sequencerSteps]
                    inactiveCells = map (noCell (cellSize*0.8) (cellSize*0.8)) $ grid
                in
                    collage w h $ inactiveCells ++ (map (gofCell (cellSize*0.8) (cellSize*0.8))
                                                        $ map (\(x,y) -> (coordinate x, coordinate y)) activeCells)

--                    $ run golAutomaton $ sampleOn clicks position
percent x p = (x * p) `div` 100

view (w,h) gol (Preset presetSn presetName presetPattern) =
    let
        layout_w = (w * 5) `div` 6
        game_h = (h * 3) `div` 5
        seqView = sequencer (percent game_h 90) (percent game_h 90) gol
    in color palColor1 $ container w h middle $ color palColor21 $
            (container layout_w game_h middle $ flow right
                [
                    golCtrl (layout_w `percent` 12) (game_h `percent` 80),
                    seqView,
                    presets (layout_w `percent` 12) (game_h `percent` 80) presetName
                ])
            `above`
            synthCtrl layout_w (h `div` 6)
            `above`
            asText presetSn

main = lift3 view dimensions mainGol presetSignal