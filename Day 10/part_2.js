const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(row => row.split(' '));

let register = 1,
    addAfterWait = 0,
    wait = 0,
    cycle = 0,
    row = 0,
    crt = new Array(6).fill(0).map(() => new Array(40).fill(false));

while (input.length || wait > 0) {
    let pos = cycle;
    if (cycle++ % 40 == 0 && cycle > 1) row++;
    while (pos >= 40) pos -= 40;

    if (register >= pos-1 && register <= pos+1) crt[row][pos] = true;

    if (wait > 0) {
        if (--wait == 0) {
            register += addAfterWait;
            addAfterWait = 0;
        }
    }
    else {
        const instruction = input.shift();

        switch(instruction[0]) {
            case 'noop': break;
            case 'addx':
                addAfterWait = Number(instruction[1]);
                wait = 1;
                break;
            default: throw `Unknown instruction ${instruction}`;
        }
    }
}

console.log(crt.map(row => row.map(i => i ? '#' : '.').join('')).join('\n'));
