const fs = require("fs");

const elves = fs.readFileSync("./input")
	.toString("utf8")
	.trim()
	.split("\n\n")
	.map(segment => segment
		.split("\n")
		.reduce((acc, cur) => acc + Number(cur), 0)
	);

console.log(elves.sort((a, b) => b - a)[0]);
