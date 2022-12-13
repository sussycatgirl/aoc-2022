const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
    .trim()
    .split('\n')
    .map(row => row.split(''));

let startPos = [-1, -1],
    endPos = [-1, -1];
let unvisited = [];
for (const i in input) {
    for (const j in input[i]) {
        if (input[i][j] == 'S') startPos = [Number(i), Number(j)];
        if (input[i][j] == 'E') endPos = [Number(i), Number(j)];
        unvisited.push([Number(i), Number(j)]);
    }
}

const nodes = input.map(row => row.map(item => item == 'S' ? 0 : Infinity));

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
        if (input[x][y] != 'E' && newPosHeight > height+1) continue;
        if (nodes[newX][newY] > nodes[x][y]+1) nodes[newX][newY] = nodes[x][y]+1;
    }

    unvisited = unvisited.filter(v => v[0] != x || v[1] != y);
}

// console.log(nodes.map((row, x) => row.map((i, y) => x == endPos[0] && y == endPos[1] ? 'E' : (i == Infinity ? '.' : `${i}`.charAt(`${i}`.length-1))).join('')).join('\n'));

console.log(nodes[endPos[0]][endPos[1]]);
