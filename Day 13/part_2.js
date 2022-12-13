const fs = require('fs');

const markers = [ [[2]], [[6]] ];

const input = [
    ...markers,
    ...fs.readFileSync('./input', 'utf8')
        .trim()
        .replace(/\n\n/g, '\n')
        .split('\n')
        .map(x => JSON.parse(x)),
];

/**
 * @param {Array|number} left 
 * @param {Array|number} right 
 * @returns {boolean|null}
 */
function compare(left, right) {
    if (left instanceof Array && !(right instanceof Array)) right = [right];
    else if (!(left instanceof Array) && right instanceof Array) left = [left];

    if (left instanceof Array && right instanceof Array) {
        for (let i = 0; i < left.length; i++) {
            if (!right[i]) return false;
            const res = compare(left[i], right[i]);
            if (res != null) return res;
        }
        if (right.length != left.length) return left.length < right.length;
        return null;
    }

    if (left > right) return false;
    if (left < right) return true;
    return null;
}

const sorted = input.sort((a, b) => compare(a, b) ? -1 : 1).map(x => JSON.stringify(x));
let x = null;

for (let i in sorted) {
    i = Number(i);

    if (markers.map(m => JSON.stringify(m)).includes(sorted[i])) {
        if (x != null) return console.log(x * (i+1));
        x = i+1;
    }
}
