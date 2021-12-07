var g_amountOfCases;
var a;
var str;
function makeArray(allData) {
    g_amountOfCases = Number(allData.split('\n')[0]);
    a = new Array(g_amountOfCases);
    var it = 0;
    while (it < g_amountOfCases) {
        allData = allData.substring(allData.indexOf("\n") + 1);
        var i_and_j = allData.split('\n')[0];
        var i = Number(i_and_j.split(' ')[0]);
        var j = Number(i_and_j.split(' ')[1]);
        allData = allData.substring(allData.indexOf("\n") + 1);
        a[it] = new Array(i);
        for (var x = 0; x < i; x++) {
            a[it][x] = new Array(j);
            var line = allData.split('\n')[0];
            for (var y = 0; y < j; y++) {
                a[it][x][y] = Number(line[y]);
            }
            allData = allData.substring(allData.indexOf("\n") + 1);
        }
        //allData = allData.substring(allData.indexOf("\n") +1);
        it++;
    }
}
function readStdinFs() {
    var fs = require("fs");
    str = fs.readFileSync(0).toString();
}
function findNearestWhite(j, i, array) {
    return [1, 2];
}
function distAllPoints(y, x, array) {
    var smallest = 999; // there is always at least one 'white' pixel and
    var dist;
    var amountWhites = array.reduce(function (a, b) { return a + b; }, 0);
    //console.log(amountWhites);
    for (var j = 0; j < array.length; j++) {
        for (var i = 0; i < array[0].length; i++) {
            if (array[j][i] == 1) {
                dist = Math.abs(y - j) + Math.abs(x - i);
                if (dist < smallest)
                    smallest = dist;
            }
        }
    }
    return smallest;
}
function solvePuzzle(array) {
    // copy array
    var sol = [];
    for (var z = 0; z < array.length; z++) {
        sol[z] = array[z].slice();
    }
    for (var j = 0; j < array.length; j++) {
        for (var i = 0; i < array[0].length; i++) {
            if (array[j][i] == 0) {
                //let pos = findNearestWhite(j, i, array);
                sol[j][i] = distAllPoints(j, i, array);
            }
            else
                sol[j][i] = 0;
        }
    }
    printSolution(sol);
}
function printSolution(array) {
    //console.log(array.length);
    //console.log(array[0].length);
    for (var j = 0; j < array.length; j++) {
        for (var i = 0; i < array[0].length; i++) {
            process.stdout.write(array[j][i].toString());
            process.stdout.write(' ');
        }
        process.stdout.write('\n');
    }
}
function main() {
    //readStdin(printStr());
    readStdinFs();
    makeArray(str);
    console.log(str);
    // for (let i = 0; i < g_amountOfCases; i++)
    // {
    // 	solvePuzzle(a[i]);
    // 	//printSolution(a[i]);
    // 	process.stdout.write('\n');
    // }
    // process.stdout.write('\n');
}
main();
// sleep time expects milliseconds
function sleep(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
// // Usage!
// sleep(500).then(() => {
//     // Do something after the sleep!
// 	console.log(process.argv[0]);
// 	console.log(process.argv[1]);
// 	console.log(process.argv[2]);
// 	console.log(process.argv[3]);
// });
//
//
//
// function getInput(): any
// {
// 	process.stdin.on('data', data => {
// 		let allData = data.toString();
// 		g_amountOfCases = Number(allData.split('\n')[0]);
//
// 		a = new Array(g_amountOfCases);
// 		let it = 0;
// 		while (it < g_amountOfCases)
// 		{
// 			allData = allData.substring(allData.indexOf("\n") +1);
// 			let i_and_j = allData.split('\n')[0];
// 			let i = Number(i_and_j.split(' ')[0]);
// 			let j = Number(i_and_j.split(' ')[1]);
// 			allData = allData.substring(allData.indexOf("\n") +1);
//
// 			a[it] = new Array(i);
// 			for (let x = 0; x < i; x++)
// 			{
// 				a[it][x] = new Array(j);
// 				let line = allData.split('\n')[0];
// 				for (let y = 0; y < j; y++)
// 				{
// 					a[it][x][y] = Number(line[y]);
// 				}
// 				allData = allData.substring(allData.indexOf("\n") +1);
// 			}
// 			//allData = allData.substring(allData.indexOf("\n") +1);
// 			it++;
// 		}
// 		// console.log(g_amountOfCases);
// 		console.log(a);
// 		return a;
// 		process.exit();
// 	})
// }
