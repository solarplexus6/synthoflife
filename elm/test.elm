--adjacentOffsets = [(0-1,0),(0-1,0-1),(0,0-1),(1,0-1),(1,0),(1,1),(0,1),(0-1,1)]

--countNghb (x,y) gof =
--    foldl (\(nx,ny) s -> if Dict.member (show (x+nx,y+ny)) gof then s+1 else s) 0 adjacentOffsets
---- List of empty neighbours
--emptyNghb (x,y) gof =
--    filter (not . (flip Dict.member gof) . show) $ map (\(nx,ny) -> (x+nx,y+ny)) adjacentOffsets

--cells = [(1,1), (1,2), (1,3)]
--gof = foldl (\(x,y) dict -> Dict.insert x y dict ) $ zip (map show cells) cells
--target = (1,2)

--survives cell gof = let count = countNghb cell gof
--                    in count == 2 || count == 3

--main = asText $ (countNghb target gof, survives target gof, emptyNghb target gof)


--import Set

--dict = fromList [1,2]
--dict = fromList [(1,2),(2,3), (1,3)]
--dict = Set.singleton (1,2)

--main = asText $ toList dict


--import JavaScript

--foreign import jsevent "providePresetUrl"
--  (castStringToJSString "")
--     presetUrl :: Signal JSString

--host = lift castJSStringToString presetUrl
--main = lift asText host


import GameOfLife as GameOfLife
import Time (every)
import Automaton

cycleExploder = [(8,8), (8,12), (6,8), (6,9), (6,10), (6,11), (6,12), (10,8), (10,9), (10,10), (10,11), (10,12) ]

golAutomaton =
    let fstep _ initGol =
            let out = GameOfLife.step initGol
            in (GameOfLife.toList out, out)
        gol = GameOfLife.fromList cycleExploder 
    in init' gol fstep

main = lift (asText) $ run golAutomaton $ (every 100)