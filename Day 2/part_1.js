const fs = require('fs');

const parseMove = (move) => {
    if (move == 'A' || move == 'X') return 'rock';
    if (move == 'B' || move == 'Y') return 'paper';
    if (move == 'C' || move == 'Z') return 'scissors';
    throw `Unknown move: '${move}'`;
}

const wins = (opponent, move) => {
    if (opponent == 'rock') return move == 'paper';
    if (opponent == 'paper') return move == 'scissors';
    if (opponent == 'scissors') return move == 'rock';
    throw `${opponent} - ${move} ??`;
}

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(parseMove));

let score = 0;

for (const line of input) {
    const isWin = wins(...line);
    score += ['rock', 'paper', 'scissors'].indexOf(line[1]) + 1;
    score += isWin ? 6 : line[0] == line[1] ? 3 : 0;
}

console.log(score);
