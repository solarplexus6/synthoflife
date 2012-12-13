import Window (dimensions)
import Mouse (clicks,position)
import Time (every)
import Automaton
import Dict as Dict
import JavaScript
import JSON
import HTTP(sendGet)

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

dictSize d = Dict.foldl (\_ _ y -> y+1) 0 d

--type GameOfLife = Dict String (Int, Int) -- Dict nie obsluguje pary jako klucz
--type State = GameOfLife

--standard patterns
exploder = [(8,8), (7,9), (8,9), (9,9), (7,10), (9,10), (8,11)]
cycleExploder = [(8,8), (8,12), (6,8), (6,9), (6,10), (6,11), (6,12), (10,8), (10,9), (10,10), (10,11), (10,12) ]

adjacentOffsets = [(0-1,0),(0-1,0-1),(0,0-1),(1,0-1),(1,0),(1,1),(0,1),(0-1,1)]
--Count number of neighbours of a cell
--countNghb :: (Int, Int) -> Dict String (Int, Int) -> Int
countNghb (x,y) gof =
    foldl (\(nx,ny) s -> if Dict.member (show (x+nx,y+ny)) gof then s+1 else s) 0 adjacentOffsets
-- List of empty neighbours
--emptyNghb :: (Int, Int) -> Dict String (Int, Int) -> [(Int,Int)]
emptyNghb (x,y) gof =
    filter (not . (flip Dict.member gof) . show) $ map (\(nx,ny) -> (x+nx,y+ny)) adjacentOffsets

gofFromList xs = Dict.fromList $ zip (map show xs) xs

gofAutomaton =
    let { fstep pos initGof =
            let { survives cell gof =
                    let count = countNghb cell gof
                    in count == 2 || count == 3
                ; empty = gofFromList $ concatMap (flip emptyNghb initGof) $ Dict.values initGof
                ; survived = Dict.foldl (\key cell gof' -> if survives cell initGof then Dict.insert key cell gof' else gof') Dict.empty initGof
                ; newborn = Dict.foldl (\key empty gof' -> if (countNghb empty initGof) == 3 then Dict.insert key empty gof' else gof') Dict.empty empty
                ; out = Dict.union survived newborn}
            in (Dict.values out, out)
        ; gof = gofFromList cycleExploder }
    in init' gof fstep

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
--                    $ run gofAutomaton $ sampleOn clicks position
                    $ run gofAutomaton $ (every 0.1)

percent x p = (x * p) `div` 100

handleResponse res =
    case res of {
        Success obj -> fromString obj
    ;   Waiting -> JSON.empty
    ;   Failure _ _ -> JSON.empty }

view (w,h) seqView preset =
    let {
        layout_w = (w * 5) `div` 6
    ;   game_h = (h * 3) `div` 5
    --;   seqView = sequencer (percent game_h 90) (percent game_h 90)
    }
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
            asText (findArray "pattern" $ handleResponse preset)

main = lift3 view dimensions (sequencer 400 400) presetSignal