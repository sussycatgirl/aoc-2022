const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => line.split('').map(char => Number(char)));

let res = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        let num = input[i][j];
        let visible = [true, true, true, true];

        for (let x = 0; x < i; x++) {
            if (input[x][j] >= num) visible[0] = false;
        }

        for (let x = i + 1; x < input.length; x++) {
            if (input[x][j] >= num) visible[1] = false;
        }

        for (let x = 0; x < j; x++) {
            if (input[i][x] >= num) visible[2] = false;
        }

        for (let x = j + 1; x < input.length; x++) {
            if (input[i][x] >= num) visible[3] = false;
        }

        if (visible.filter(v => v).length) res++;
    }
}

console.log(res);
