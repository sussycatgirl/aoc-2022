const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => [ line.substring(0, line.length / 2), line.substring(line.length / 2) ]);

/**
 * @param {string} comp1 
 * @param {string} comp2 
 */
const findMatch = (comp1, comp2) => {
    for (const char of comp1.split('')) {
        if (comp2.includes(char)) return char;
    }

    throw `No matching character found in: '${comp1}' '${comp2}'`;
}

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

for (const line of input) {
    sum += getPrio(findMatch(...line));
}

console.log(sum);
