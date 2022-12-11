const fs = require('fs');
const inputArr = fs.readFileSync('./input', 'utf8')
    .trim()
    .split('\n\n')
    .map(monkey => monkey.split('\n'));

const monkeys = [];
let commonDivider = 2;

class Monkey {
    calculateOperation(item) {
        const args = this.operation.split(' ');
        if (args[0] == 'old') args[0] = item;
        if (args[2] == 'old') args[2] = item;

        switch(args[1]) {
            case '+': return Number(args[0]) + Number(args[2]);
            case '-': return Number(args[0]) - Number(args[2]);
            case '*': return Number(args[0]) * Number(args[2]);
            case '/': return Number(args[0]) / Number(args[2]);
            default: throw `Unknown operation ${args[1]}`;
        }
    }

    runRound() {
        let item = this.calculateOperation(this.items.shift()) % commonDivider;
        monkeys[item % this.test == 0 ? this.monkeyTrue : this.monkeyFalse].items.push(item);
        this.inspections++;
    }

    runTurn() {
        while (this.items.length) this.runRound();
    }

    constructor(monkey) {
        this.items = monkey[1].match(/[0-9]+/g).map(item => Number(item));
        this.operation = monkey[2].match(/([0-9]+|old) (\+|\-|\*|\/) ([0-9]+|old)/)[0];
        this.test = monkey[3].match(/[0-9]+/)[0];
        this.monkeyTrue = monkey[4].match(/[0-9]+/)[0];
        this.monkeyFalse = monkey[5].match(/[0-9]+/)[0];
        this.inspections = 0;
    }
}

for (const monkey of inputArr) {
    monkeys.push(new Monkey(monkey));
}

// Find the lowest common divider. This approach takes about 2 seconds but idc
while (monkeys.filter(m => commonDivider % m.test).length) {
    commonDivider++;
}

for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) monkey.runTurn();
}

const sorted = monkeys.sort((a, b) => b.inspections - a.inspections);
console.log(sorted[0].inspections * sorted[1].inspections);
