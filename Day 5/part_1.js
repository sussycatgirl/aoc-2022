const fs = require("fs");

const inputText = fs.readFileSync("./input").toString("utf-8").trimEnd();
const [stackText, instructions] = inputText.split("\n\n");

const stack = [];
for (let i = 0; i < stackText.split('\n')[stackText.split('\n').length - 1].replace(/ /g, '').length; i++) {
    stack[i] = [];
}

for (const line of stackText.split('\n')) {
    if (!line.includes('[')) continue; // Filter last line

    const blocks = line.match(/.{1,4}/g).map(block => block.substring(1, 2));
    for (const i in blocks) {
        const block = blocks[i];
        if (block != ' ') stack[i].push(block);
    }
}

for (const instruction of instructions.split('\n')) {
    const [count, from, to] = instruction.match(/[0-9]+/g).map(i => Number(i));
    
    for (let i = 0; i < count; i++) {
        stack[to - 1].unshift(stack[from - 1].shift());
    }
}

console.log(stack.map(row => row[0]).join(''));
