const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => line.split('').map(char => Number(char)));

let res = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        let num = input[i][j];
        let trees = [0, 0, 0, 0];

        for (let x = i - 1; x >= 0; x--) {
            trees[0]++;
            if (input[x][j] >= num) break;
        }

        for (let x = i + 1; x < input.length; x++) {
            trees[1]++;
            if (input[x][j] >= num) break;
        }

        for (let x = j - 1; x >= 0; x--) {
            trees[2]++;
            if (input[i][x] >= num) break;
        }

        for (let x = j + 1; x < input.length; x++) {
            trees[3]++;
            if (input[i][x] >= num) break;
        }

        res.push(trees.reduce((prev, cur) => prev * cur, 1));
    }
}

console.log(res.sort((a, b) => b - a)[0]);
