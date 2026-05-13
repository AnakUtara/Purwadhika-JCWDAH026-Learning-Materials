const getMinMaxAvgFromArray = (
	numbers: number[],
): { min: number; max: number; avg: number } => {
	const min = Math.min(...numbers);
	const max = Math.max(...numbers);
	const avg = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
	return { min, max, avg };
};

console.log(getMinMaxAvgFromArray([12, 5, 23, 18, 4, 45, 32]));

const arrayToString = (arr: string[]): string => {
	const addAnd = arr.length > 1 ? arr.splice(arr.length - 1, 1, "and") : "";
	return `${arr.join(", ")} ${arr.length > 1 ? addAnd : ""}`;
};

console.log(arrayToString(["apple", "banana", "cherry"]));
console.log(arrayToString(["apple", "banana"]));
console.log(arrayToString(["apple"]));

const findSecondSmallest = (numbers: number[]): number => {
	const sortedNumbers = numbers.sort((a, b) => a - b);
	return sortedNumbers[1];
};

console.log(findSecondSmallest([5, 3, 1, 7, 2, 6]));

const calcSameLengthArray = (arr1: number[], arr2: number[]): number[] => {
	if (arr1.length !== arr2.length) {
		console.warn("Arrays must be of the same length");
		return [];
	}
	return arr1.map((n, i) => n + arr2[i]);
};

console.log(calcSameLengthArray([1, 2, 3], [3, 2, 1]));

const pushNewElementToArr = (arr: number[], element: number): number[] => {
	const newArr = [...arr];
	if (!newArr.includes(element)) newArr.push(element);
	return newArr;
};

console.log(pushNewElementToArr([1, 2, 3], 4));
console.log(pushNewElementToArr([1, 2, 3], 2));

const sumNumbersOnlyFromMixedArray = (arr: unknown[]): number => {
	return arr.reduce((sum: number, item) => {
		if (typeof item === "number") {
			return sum + item;
		}
		return sum;
	}, 0);
};

console.log(
	sumNumbersOnlyFromMixedArray([1, "2", 3, true, 4, "5", undefined, null]),
);

const limitIntArray = (maxSize: number, intArray: number[]): number[] => {
	return intArray.slice(0, maxSize);
};

console.log(limitIntArray(5, [1, 2, 3, 4, 5, 6]));

const combineArray = (arr1: unknown[], arr2: unknown[]): unknown[] => {
	return [...arr1, ...arr2];
};

console.log(combineArray([1, 2, 3], ["a", "b", "c", "d"]));

const findDuplicates = (arr: number[]): number[] => {
	const duplicates: number[] = [];
	const seen: number[] = [];
	arr.forEach((item) => {
		if (seen.includes(item) && !duplicates.includes(item)) {
			duplicates.push(item);
		} else {
			seen.push(item);
		}
	});
	return duplicates;
};

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 3, 6, 1]));

const findDuplicatesWithFilter = (arr: number[]): number[] => {
	return arr.filter((item, index) => arr.indexOf(item) !== index);
};

console.log(findDuplicatesWithFilter([1, 2, 3, 2, 4, 5, 3, 6, 1]));

const findDifference = (arr1: number[], arr2: number[]): number[] => {
	const arr1Diff = arr1.filter((item) => !arr2.includes(item));
	const arr2Diff = arr2.filter((item) => !arr1.includes(item));
	return [...arr1Diff, ...arr2Diff];
};

console.log(findDifference([1, 2, 3, 4], [3, 4, 5, 6]));
console.log(findDifference([5, 6, 7], [1, 2, 3]));

const getPrimitives = (arr: unknown[]): unknown[] => {
	const isPrimitives = (item: unknown): boolean => {
		return (
			typeof item === "string" ||
			typeof item === "number" ||
			typeof item === "boolean" ||
			typeof item === "undefined" ||
			item === null
		);
	};
	return arr.filter(isPrimitives);
};

console.log(
	getPrimitives([1, "two", true, null, undefined, { a: 1 }, [1, 2], NaN]),
);

const sumOfDuplicates = (arr: number[]): number => {
	const sorted = [...arr].sort((a, b) => a - b);

	const duplicates = sorted.filter((item, i) => {
		const isSameAsPrevious = item === sorted[i - 1];
		const isSameAsNext = item === sorted[i + 1];

		return isSameAsPrevious || isSameAsNext;
	});

	return duplicates.reduce((sum, item) => sum + item, 0);
};

console.log(sumOfDuplicates([1, 2, 3, 2, 4, 5, 3, 6, 1]));
console.log(sumOfDuplicates([10, 20, 40, 10, 50, 30, 10, 60, 10]));

type RPSChoice = "rock" | "paper" | "scissors";

const rockPaperScissors = (player1: RPSChoice): string => {
	const validChoice: RPSChoice[] = ["rock", "paper", "scissors"];
	const player2 = validChoice[Math.floor(Math.random() * validChoice.length)];

	if (player1 === player2) {
		return "It's a tie!";
	} else if (
		(player1 === "rock" && player2 === "scissors") ||
		(player1 === "paper" && player2 === "rock") ||
		(player1 === "scissors" && player2 === "paper")
	) {
		return "Player 1 wins!";
	} else {
		return "Player 2 wins!";
	}
};

console.log(rockPaperScissors("rock"));
console.log(rockPaperScissors("paper"));
console.log(rockPaperScissors("scissors"));
