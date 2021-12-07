
let g_amountOfCases: number;
let a: any[];
let str: string;

function makeArray(allData: string): void
{
	g_amountOfCases = Number(allData.split('\n')[0]);
	a = new Array(g_amountOfCases);
	let it = 0;
	while (it < g_amountOfCases)
	{
		allData = allData.substring(allData.indexOf("\n") +1);
		let i_and_j = allData.split('\n')[0];
		let i = Number(i_and_j.split(' ')[0]);
		let j = Number(i_and_j.split(' ')[1]);
		allData = allData.substring(allData.indexOf("\n") +1);

		a[it] = new Array(i);
		for (let x = 0; x < i; x++)
		{
			a[it][x] = new Array(j);
			let line = allData.split('\n')[0];
			for (let y = 0; y < j; y++)
			{
				a[it][x][y] = Number(line[y]);
			}
			allData = allData.substring(allData.indexOf("\n") +1);
		}
		//allData = allData.substring(allData.indexOf("\n") +1);
		it++;
	}
}

function readStdinFs()
{
	let fs = require("fs");
	str = fs.readFileSync(0).toString();
}

function findNearestWhite(j, i, array): any
{

	return [1,2];

}

function distAllPoints(y, x, array): number
{
	let smallest = 999; // there is always at least one 'white' pixel and
	let dist;

	let amountWhites = array.reduce(function(a, b) { return a+b; }, 0);
	//console.log(amountWhites);
	for (let j = 0; j < array.length; j++)
	{
		for (let i = 0; i < array[0].length; i++)
		{
			if (array[j][i] == 1)
			{
				dist = Math.abs(y - j) + Math.abs(x - i);
				if (dist < smallest)
					smallest = dist;
			}
		}
	}
	return smallest;
}

function solvePuzzle(array)
{
	// copy array
	let sol = [];
	for (let z = 0; z < array.length; z++)
	{
		sol[z] = array[z].slice();
	}

	for (let j = 0; j < array.length; j++)
	{
		for (let i = 0; i < array[0].length; i++)
		{
			if (array[j][i] == 0)
			{
				//let pos = findNearestWhite(j, i, array);
				sol[j][i] = distAllPoints(j, i, array);
			}
			else
				sol[j][i] = 0;
		}
	}
	printSolution(sol);
}

function printSolution(array)
{
	//console.log(array.length);
	//console.log(array[0].length);
	for (let j = 0; j < array.length; j++)
	{
		for (let i = 0; i < array[0].length; i++)
		{
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
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
