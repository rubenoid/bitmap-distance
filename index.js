var g_amountOfCases;
var format;
/* make one 3D array of all the puzzles */
function makeArray(allData) {
    g_amountOfCases = Number(allData.split('\n')[0]);
    var a;
    a = allData.split("\n\n");
    for (var i = 0; i < g_amountOfCases; i++) {
        a[i] = a[i].split("\n");
    }
    /* the last puzzle has an empty line at its last index, so we have to pop that on off */
    a[g_amountOfCases - 1].pop();
    /* remove first line */
    a[0].shift();
    /* split the lines into an array and map them as Number types */
    for (var i = 0; i < g_amountOfCases; i++) {
        /* remove n m, we will use a.length and a[0].length respectively */
        a[i].shift();
        for (var j = 0; j < a[i].length; j++) {
            a[i][j] = a[i][j].split('');
            a[i][j] = a[i][j].map(Number);
        }
    }
    return a;
}
function readStdinFs() {
    var fs = require("fs");
    return (fs.readFileSync(0).toString());
}
function solvePuzzle(sol, level, solvedCells) {
    for (var j = 0; j < sol.length; j++) {
        for (var i = 0; i < sol[0].length; i++) {
            if (sol[j][i] == level) {
                /* look up */
                if (j > 0 && sol[j - 1][i] == 0) {
                    sol[j - 1][i] = level + 1;
                    solvedCells++;
                }
                /* look down */
                if (j < (sol.length - 1) && sol[j + 1][i] == 0) {
                    sol[j + 1][i] = level + 1;
                    solvedCells++;
                }
                /* look left */
                if (i > 0 && sol[j][i - 1] == 0) // look left
                 {
                    sol[j][i - 1] = level + 1;
                    solvedCells++;
                }
                /* look right */
                if (i < (sol[0].length - 1) && sol[j][i + 1] == 0) // look right
                 {
                    sol[j][i + 1] = level + 1;
                    solvedCells++;
                }
            }
        }
    }
    /* if the solvedCells is equal to the total number of cells, we are close to solving the puzzle */
    if (solvedCells < (sol.length * sol[0].length)) {
        solvePuzzle(sol, level + 1, solvedCells);
        return;
    }
    /* last step is to subtract 1 for all cells */
    for (var j = 0; j < sol.length; j++)
        for (var i = 0; i < sol[0].length; i++)
            sol[j][i] -= 1;
    /* we can print the solution */
    printArray(sol);
}
function printArray(array) {
    for (var j = 0; j < array.length; j++) {
        for (var i = 0; i < array[0].length; i++) {
            if (format) {
                if (array[j][i].toString().length > 1)
                    process.stdout.write(' ');
                else
                    process.stdout.write('  ');
            }
            process.stdout.write(array[j][i].toString());
        }
        process.stdout.write('\n');
    }
}
function amountOfWhites(array) {
    var res = 0;
    for (var j = 0; j < array.length; j++)
        for (var i = 0; i < array[0].length; i++)
            if (array[j][i] == 1)
                res++;
    return res;
}
function main() {
    format = Boolean(process.argv[2]);
    var str = readStdinFs();
    var a = makeArray(str);
    for (var i = 0; i < g_amountOfCases; i++) {
        solvePuzzle(a[i], 1, amountOfWhites(a[i]));
        process.stdout.write('\n');
    }
}
main();
