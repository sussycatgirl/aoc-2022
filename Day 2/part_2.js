const fs = require('fs');

const parseMove = (move) => {
    if (move == 'A' || move == 'X') return 'rock';
    if (move == 'B' || move == 'Y') return 'paper';
    if (move == 'C' || move == 'Z') return 'scissors';
    throw `Unknown move: '${move}'`;
}

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => [ parseMove(line.split(' ')[0]), line.split(' ')[1] ]);

let score = 0;

for (const line of input) {
    score += line[1] == 'X' ? 0 : line[1] == 'Y' ? 3 : 6;

    let ownScore = ['rock', 'paper', 'scissors'].indexOf(line[0]) + 1;
    if (line[1] == 'X') ownScore--;
    if (line[1] == 'Z') ownScore++;
    if (ownScore > 3) ownScore = 1;
    if (ownScore < 1) ownScore = 3;

    score += ownScore;
}

console.log(score);
