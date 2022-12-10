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
    result = 0;

while (input.length || wait > 0) {
    if ((++cycle + 20) % 40 == 0) {
        result += register * cycle;
    }

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

console.log(result);
