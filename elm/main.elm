import Window (dimensions)
import Mouse (clicks,position)

repeat a n = map (\_ -> a) [1..n]

clickLocations = foldp (:) [] (sampleOn clicks position)

placeholder w h col text = color col $ container w h middle $ plainText text

data GameOfLife = GameOfLife [(Int, Int)]
type State = GameOfLife

gofAutomaton =
  let fstep pos fs =
          let fs' = fs ++ [filled cyan (ngon 5 20 pos)]
          in  unzip $ map (\f -> step f mouse) fs'
  in  init' [filled cyan (ngon 5 20 (200,200)) ] fstep

synthCtrl w h = placeholder w h blue "Sythesizer controls"
golCtrl w h = placeholder w h (rgb 56 56 56) "GoL controls"
presets w h = placeholder w h (rgb 56 56 56) "Presets"
sequencer w h = let { steps = 16.0
                    ; cellSize = toFloat(w)/steps
                    ; coordinates = map (\x -> cellSize*toFloat(x) - cellSize*0.5) [1..steps]
                    ; grid = concatMap (\c -> zip (repeat c steps) coordinates) coordinates }
                    ; inactiveCells = map (filled (rgb 64 64 64) . rect (cellSize*0.8) (cellSize*0.8)) $ grid
                in
                    lift (\activeCelss -> collage w h $ inactiveCells ++ active)
                    $ run gofAutomaton $ sampleOn clicks position

percent x p = (x * p) `div` 100

view (w,h) = 
    let layout_w = (w * 5) `div` 6 in
    let game_h = (h * 3) `div` 5 in
    container w h middle $ color grey $
        (container layout_w game_h middle $ flow right 
            [
                golCtrl (percent layout_w 12) (percent game_h 80),
                sequencer (percent game_h 90) (percent game_h 90),
                presets (percent layout_w 12) (percent game_h 80)
            ])
        `above`
        synthCtrl layout_w (h `div` 6)

main = lift view dimensions