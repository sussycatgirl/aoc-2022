const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => line.split(',').map(pair => pair.split('-').map(i => Number(i))));

let result = 0;

for (const pair of input) {
    if ((pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
        (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
        (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
        (pair[1][1] >= pair[0][1] && pair[1][1] <= pair[0][1]))
    {
        result++;
    }
}

console.log(result);
