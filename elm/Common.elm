module Common (repeat, grid) where

repeat a n = map (\_ -> a) [1..n]
grid size = concatMap (\c -> zip (repeat c size) [1..size]) [1..size]