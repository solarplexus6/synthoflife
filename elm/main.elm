import Window (dimensions)
import Mouse (clicks,position)
import Time (every)
import Automaton
import Set(insert, singleton, toList)

repeat a n = map (\_ -> a) [1..n]

clickLocations = foldp (:) [] (sampleOn clicks position)

placeholder w h col text = color col $ container w h middle $ plainText text

type GameOfLife = Set (Int, Int)
--type State = GameOfLife

--gofCell=   ((filled (rgb 255 102 0) .) .) . rect
gofCell w h (x,y) =   filled (rgb 255 102 0) $ rect w h (x,y)
--noCell =   ((filled (rgb 64 64 64) .) .) . rect
noCell w h (x,y)  = filled (rgb 64 64 64) $ rect w h (x,y)

gofAutomaton =
    let fstep (x,y) cells = 
        let out = (x/5, y/5):cells
        in (out,out)
    in init' ([(0,0)]) fstep

synthCtrl w h = placeholder w h blue "Sythesizer controls"
golCtrl w h = placeholder w h (rgb 56 56 56) "GoL controls"
presets w h = placeholder w h (rgb 56 56 56) "Presets"
sequencer w h = let { steps = 16.0
                    ; cellSize = toFloat(w)/steps
                    ; coordinates = map (\x -> cellSize*toFloat(x) - cellSize*0.5) [1..steps]
                    ; grid = concatMap (\c -> zip (repeat c steps) coordinates) coordinates
                    ; inactiveCells = map (noCell (cellSize*0.8) (cellSize*0.8)) $ grid }
                in
                    lift (\activeCells -> collage w h $ inactiveCells ++ (map (gofCell (cellSize*0.8) (cellSize*0.8)) activeCells))
                    $ run gofAutomaton $ sampleOn clicks position
--                    $ run gofAutomaton $ (every 1)

percent x p = (x * p) `div` 100

view (w,h) seqView = 
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

main = lift2 view dimensions $ sequencer 400 400