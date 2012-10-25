import Signal.Window (dimensions)

placeholder w h col text = color col $ container w h middle $ plainText text

synthCtrl w h = placeholder w h blue "Sythesizer controls"
golCtrl w h = placeholder w h (rgb 56 56 56) "GoL controls"
presets w h = placeholder w h (rgb 56 56 56) "Presets"
sequencer w h = placeholder w h black "Sequencer"

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