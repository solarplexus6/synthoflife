module GameOfLife (empty, step, alive
                   ,toList, fromList
                   ,insert, remove
                   ,limit) where

import Common as Common

--alive :: (Int, Int) -> GameOfLife -> Bool
alive       = Set.member
empty       = Set.empty

fromList    = Set.fromList
toList      = Set.toList

insert = Set.insert

--remove :: (Int, Int) -> GameOfLife -> GameOfLife
remove = Set.remove

adjacentOffsets = [(0-1,0),(0-1,0-1),(0,0-1),(1,0-1),(1,0),(1,1),(0,1),(0-1,1)]
--Count number of neighbours of a cell
--countNghb :: (Int, Int) -> GameOfLife -> Int
countNghb (x,y) gof =
    length $ filter (\(nx,ny) -> alive (x+nx,y+ny) gof) adjacentOffsets
-- List of empty neighbours
--emptyNghb :: (Int, Int) -> GameOfLife -> [(Int,Int)]
emptyNghb (x,y) gof =
    filter (not . (flip alive gof)) $ map (\(nx,ny) -> (x+nx,y+ny)) adjacentOffsets

--step :: GameOfLife -> GameOfLife
step initGof = let  survives cell gof =
                        let count = countNghb cell gof
                        in count == 2 || count == 3
                    emptyCells  = fromList $ concatMap (flip emptyNghb initGof) $ toList initGof
                    survived    = Set.foldl (\cell gof' -> if survives cell initGof then insert cell gof' else gof')
                                    empty initGof
                    newborn     = Set.foldl (\cell gof' -> if (countNghb cell initGof) == 3 then insert cell gof' else gof')
                                    empty emptyCells
                in  Set.union survived newborn

limit gof size = let mask = Set.fromList $ Common.grid size
                 in Set.intersect gof mask