const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
    .trim()
    .split('\n\n')
    .map(x => x.split('\n').map(y => JSON.parse(y)));

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


console.log(input.map((pair) => compare(...pair)).reduce((prev, cur, i) => prev + (cur ? i + 1 : 0), 0));
