const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
    .trim()
    .split('\n')
    .map(row => row.split(''));

let unvisited = [];
for (const i in input) {
    for (const j in input[i]) {
        unvisited.push([Number(i), Number(j)]);
    }
}

let lowest = [...unvisited].filter(n => input[n[0]][n[1]] == 'a' || input[n[0]][n[1]] == 'S');

const nodes = input.map(row => row.map(item => item == 'E' ? 0 : Infinity));

while (unvisited.length) {
    const [x, y] = unvisited.sort((a, b) => nodes[a[0]][a[1]] - nodes[b[0]][b[1]])[0];
    const height = input[x][y] == 'S'
        ? 'a'.charCodeAt(0) :
        input[x][y] == 'E'
            ? 'z'.charCodeAt(0)
            : input[x][y].charCodeAt(0);

    for (const [newX, newY] of [ [x+1, y], [x-1, y], [x, y+1], [x, y-1] ]) {
        if (newX < 0 || newY < 0 || newX >= input.length || newY >= input[newX].length) continue;
        const newPosHeight = input[newX][newY].charCodeAt(0);
        if (newPosHeight < height-1) continue;
        if (nodes[newX][newY] > nodes[x][y]+1) nodes[newX][newY] = nodes[x][y]+1;
    }

    unvisited = unvisited.filter(v => v[0] != x || v[1] != y);
}

// console.log(nodes.map((row, x) => row.map((i, y) => x == i == Infinity ? '.' : `${i}`.charAt(`${i}`.length-1)).join('')).join('\n'));

console.log(lowest.map(n => nodes[n[0]][n[1]]).sort((a, b) => a - b)[0]);
