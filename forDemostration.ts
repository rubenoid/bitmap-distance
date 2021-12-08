let g_amountOfCases: number;
let format: boolean;

function makeArray(allData: string): any
{
	g_amountOfCases = Number(allData.split('\n')[0]);

	let a: any[];
	a = allData.split("\n\n");

	for (let i = 0; i < g_amountOfCases; i++)
	{
		a[i] = a[i].split("\n");
	}

	/* the last puzzle has an empty line at its last index, so we have to pop that on off */
	a[g_amountOfCases - 1].pop();

	/* remove first line */
	a[0].shift();

	/* split the lines into an array and map them as Number types */
	for (let i = 0; i < g_amountOfCases; i++)
	{
		/* remove n m, we will use a.length and a[0].length respectively */
		a[i].shift();
		for (let j = 0; j < a[i].length; j++)
		{
			a[i][j] = a[i][j].split('');
			a[i][j] = a[i][j].map(Number);
		}
	}
	return a;
}

function readStdinFs()
{
	let fs = require("fs");
	return(fs.readFileSync(0).toString());
}

let visitedCells = 0;
function solvePuzzle(sol, level, solvedCells)
{
	for (let j = 0; j < sol.length; j++)
	{
		for (let i = 0; i < sol[0].length; i++)
		{
			if (sol[j][i] == level)
			{
				/* look up */
				if (j > 0 && sol[j - 1][i] == 0)
				{
					sol[j - 1][i] = level + 1;
					solvedCells++;
				}

				/* look down */
				if (j < (sol.length - 1) && sol[j + 1][i] == 0)
				{
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
			visitedCells++;
		}
	}

	/* if the solvedCells is equal to the total number of cells, we are close to solving the puzzle */
	if (solvedCells < (sol.length * sol[0].length))
	{
		printArray(sol);
		console.log('\n');
		solvePuzzle(sol, level + 1, solvedCells);
		return;
	}

	printArray(sol);
	console.log('\n');
	/* last step is to subtract 1 for all cells */
	for (let j = 0; j < sol.length; j++)
	 	for (let i = 0; i < sol[0].length; i++)
	 		sol[j][i] -= 1;

	visitedCells += sol.length * sol[0].length;
	/* we can print the solution */
	printArray(sol);
}

function printArray(array)
{
	for (let j = 0; j < array.length; j++)
	{
		for (let i = 0; i < array[0].length; i++)
		{
			if (format)
			{
				if (array[j][i].toString().length > 1)
					process.stdout.write(' ');
				else
					process.stdout.write('  ');
			}
			if (array[j][i] == 0)
				process.stdout.write('.');
			else
				process.stdout.write(array[j][i].toString());
		}
		process.stdout.write('\n');
	}
}

function amountOfWhites(array)
{
	let res = 0;
	for (let j = 0; j < array.length; j++)
		for (let i = 0; i < array[0].length; i++)
			if (array[j][i] == 1)
				res++;

	return res;
}

function main() {
	format = Boolean(process.argv[2]);
	let str = readStdinFs();
	let a = makeArray(str);

	for (let i = 0; i < g_amountOfCases; i++)
	{
		solvePuzzle(a[i], 1, amountOfWhites(a[i]));
		//solvePuzzleNaive(a[i]);
		process.stdout.write('\n');
	}
	console.log("visitedCells:");
	console.log(visitedCells.toLocaleString());
}

main();

/* Naive solving algorithm for reference */

// function solvePuzzleNaive(array)
// {
// 	// copy array
// 	let sol = [];
// 	for (let z = 0; z < array.length; z++)
// 	{
// 		sol[z] = array[z].slice();
// 	}
//
// 	for (let j = 0; j < array.length; j++)
// 	{
// 		for (let i = 0; i < array[0].length; i++)
// 		{
// 			if (array[j][i] == 0)
// 			{
// 				//let pos = findNearestWhite(j, i, array);
// 				sol[j][i] = distAllPoints(j, i, array);
// 			}
// 			else
// 				sol[j][i] = 0;
// 		}
// 	}
// 	printArray(sol);
// }
//
// let all_calc = 0;
// function distAllPoints(y, x, array): number
// {
// 	let smallest = 999; // there is always at least one 'white' pixel and
// 	let dist;
//
// 	for (let j = 0; j < array.length; j++)
// 	{
// 		for (let i = 0; i < array[0].length; i++)
// 		{
// 			if (array[j][i] == 1)
// 			{
// 				dist = Math.abs(y - j) + Math.abs(x - i);
// 				if (dist < smallest)
// 					smallest = dist;
// 			}
// 			if (smallest == 1)
// 			{
// 				return 1;
// 			}
// 		}
// 		all_calc++;
// 	}
// 	return smallest;
// }
//
