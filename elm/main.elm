import Window (dimensions)
import Mouse (clicks,position)
import Maybe (mapMaybe)
import Time (every)
import Automaton
import JavaScript
import JSON as JSON
import HTTP(sendGet)
import GameOfLife as GameOfLife

repeat a n = map (\_ -> a) [1..n]

clickLocations = foldp (:) [] (sampleOn clicks position)

placeholder w h col text = color col $ container w h middle $ plainText text

foreign import jsevent "provideHost"
  (castStringToJSString "")
     jsHost :: Signal JSString

foreign import jsevent "providePresetUrl"
  (castStringToJSString "")
     presetUrl :: Signal JSString

host = lift castJSStringToString jsHost
presetSignal = sendGet $ lift castJSStringToString presetUrl
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
patternSignal = lift (\preset -> mapMaybe (\obj ->getPoint $ JSON.toList $ getValue obj) (JSON.findArray "pattern" $ handleResponse preset)) presetSignal

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
                out = GameOfLife.step gol
            in (GameOfLife.toList out, out)
        gol = GameOfLife.fromList cycleExploder 
    in init' gol fstep

--gofCell=   ((filled (rgb 255 102 0) .) .) . rect
gofCell w h (x,y) =   filled (rgb 255 102 0) $ rect w h (x,y)
--noCell =   ((filled (rgb 64 64 64) .) .) . rect
noCell w h (x,y)  = filled (rgb 64 64 64) $ rect w h (x,y)

synthCtrl w h = placeholder w h blue "Sythesizer controls"
golCtrl w h = placeholder w h (rgb 56 56 56) "GoL controls"
presets w h = placeholder w h (rgb 56 56 56) "Presets"
sequencer w h = let { steps = 16
                    ; cellSize = toFloat(w)/steps
                    ; coordinate x = cellSize*toFloat(x) - cellSize*0.5
                    ; grid = concatMap (\c -> zip (repeat c steps) $ map coordinate [1..steps]) $ map coordinate [1..steps]
                    ; inactiveCells = map (noCell (cellSize*0.8) (cellSize*0.8)) $ grid }
                in
                    lift (\activeCells -> collage w h $ inactiveCells ++ (map (gofCell (cellSize*0.8) (cellSize*0.8)) $ map (\(x,y) -> (coordinate x, coordinate y)) activeCells))
                    $ run golAutomaton $ patternSignal `merge` (lift (\_ -> []) $ every 100)
--                    $ run gofAutomaton $ sampleOn clicks position

percent x p = (x * p) `div` 100

view (w,h) seqView pattern =
    let
        layout_w = (w * 5) `div` 6
        game_h = (h * 3) `div` 5
    --;   seqView = sequencer (percent game_h 90) (percent game_h 90)
    in container w h middle $ color grey $
            (container layout_w game_h middle $ flow right
                [
                    golCtrl (percent layout_w 12) (percent game_h 80),
                    seqView,
                    presets (percent layout_w 12) (percent game_h 80)
                ])
            `above`
            synthCtrl layout_w (h `div` 6)
            `above`
            asText pattern

main = lift3 view dimensions (sequencer 400 400) patternSignal