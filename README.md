# Bitmap Distance
(Distance defined as the Manhatten Distance)

#### Install dependencies
```
$ npm install
```

#### Compile .ts files to .js
```
$ tsc index.ts && tsc forDemonstration.ts
```

#### To run

```
$ cat [a puzzle] | node index.js
```

#### To run with spacing for a better view of the solution

```
$ cat [a puzzle] | node index.js -s
```


#### If you want a better view of how the algorithm works
After each recursive call of the algorithm the puzzle will be printed. `0`'s are replaced by `.`'s for a better overview. Each time a cell is visited, a variable keeps track of this and the outcome will be printed at the end.


```
$ cat [a puzzle] | node forDemonstration.js [optional -s]
```
