const fs = require("fs");

const elves = fs.readFileSync("./input")
	.toString("utf8")
	.trim()
	.split("\n\n")
	.map(segment => segment
		.split("\n")
		.reduce((acc, cur) => acc + Number(cur), 0)
	)
	.sort((a, b) => b - a);

console.log(elves[0] + elves[1] + elves[2]);
