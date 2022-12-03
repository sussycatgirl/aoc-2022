const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n');

/**
 * @param {string} char 
 */
const getPrio = (char) => {
    if (char.length != 1) throw `'${char}' is not a single character`;
    if (char == char.toLowerCase()) {
        // a-z -> 97-122
        return char.charCodeAt(0) - 96;
    } else {
        // A-Z -> 65-90
        return char.charCodeAt(0) - 38;
    }
}

let sum = 0;

for (let i = 0; i < input.length; i += 3) {
    const backpacks = [ input[i], input[i + 1], input[i + 2] ];

    let matches = backpacks[0].split('');

    for (const backpack of [backpacks[1], backpacks[2]]) {
        for (const char of matches) {
            if (!backpack.includes(char)) matches = matches.filter(c => c != char);
        }
    }

    sum += getPrio(matches[0]);
}

console.log(sum);
