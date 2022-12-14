const fs = require('fs');

const WALL = '#';
const SAND = 'O';
const SPAWN_POS = [500, 0];

const input = fs.readFileSync('./input', 'utf8')
    .trim()
    .split('\n')
    .map(row => row.split(' -> ').map(i => i.split(',').map(x => Number(x)).reverse()));

let width = 0,
    height = 0;

for (const entry of input) {
    for (const instruction of entry) {
        if (instruction[0] > width) width = instruction[0];
        if (instruction[1] > height) height = instruction[1];
    }
}

input.push([[ width + 2, 0 ], [ width + 2, height ]]);

const map = Array(width + 3).fill(0).map(() => Array(height + 1).fill(null));

for (const entry of input) {
    for (let x = 0; x < entry.length-1; x++) {
        const [from, to] = [entry[x], entry[x+1]];

        if (from[0] != to[0]) {
            for (let i = from[0]; from[0] > to[0] ? i >= to[0] : i <= to[0]; from[0] > to[0] ? i-- : i++) {
                map[i][from[1]] = WALL;
            }
        }
        else if (from[1] != to[1]) {
            for (let i = from[1]; from[1] > to[1] ? i >= to[1] : i <= to[1]; from[1] > to[1] ? i-- : i++) {
                map[from[0]][i] = WALL;
            }
        }
    }
}

// console.log(map.map((row, x) => row.map((i, y) => x == SPAWN_POS[1] && y == SPAWN_POS[0] ? 'X' : (i ? i : '.')).join('')).join('\n'))

let res = 0;
while (true) {
    const pos = [...SPAWN_POS].reverse();
    while (true) {
        if (pos[1] >= map[0].length) {
            map.forEach((row, i) => row.push(i == map.length-1 ? WALL : null));
        }

        if (pos[0] == map.length - 2) break;

        if (map[pos[0]+1][pos[1]] == null) {
            pos[0]++;
        }
        else if (map[pos[0]+1][pos[1]-1] == null) {
            pos[0]++;
            pos[1]--;
        }
        else if (map[pos[0]+1][pos[1]+1] == null) {
            pos[0]++;
            pos[1]++;
        }
        else break;

    }
    map[pos[0]][pos[1]] = SAND;
    res++;
    if (pos[0] == SPAWN_POS[1] && pos[1] == SPAWN_POS[0]) break;
}

console.log(res);
