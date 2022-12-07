const fs = require('fs');

const input = fs.readFileSync('input')
    .toString('utf8')
    .trim()
    .split('\n');

let pwd = [];
let filesystem = {};
let sizes = {};

for (const line of input) {
    const args = line.split(' ');
    if (args[0] == '$') {
        switch (args[1]) {
            case 'cd': {
                if (args[2] == '/') pwd = [];
                else if (args[2] == '..') pwd.pop();
                else {
                    pwd.push(args[2]);
                    mkdir(pwd, filesystem);
                }
                break;
            }
            case 'ls': break;
            default: throw `Unknown command "${args[1]}"`;
        }
    } else {
        const [size, filename] = args;
        if (size != 'dir') storeSize([...pwd, filename], filesystem, Number(size));
    }
}

let total = 0;

countSize(filesystem, []);
for (const size of Object.values(sizes)) {
    if (size <= 100000) total += size;
}

console.log(total);

function mkdir(path, fs) {
    if (typeof fs[path[0]] == 'undefined') fs[path[0]] = {};
    if (path.length > 1) mkdir(path.slice(1), fs[path[0]]);
}

function storeSize(path, fs, size) {
    if (path.length > 1) storeSize(path.slice(1), fs[path[0]], size);
    else {
        fs[path[0]] = size;
    }
}

function countSize(fs, path) {
    return Object.entries(fs).reduce((prev, cur) => {
        const size = typeof cur[1] == 'number' ? cur[1] : countSize(cur[1], [...path, cur[0] ]);
        sizes[`/${path.join('/')}`] = size + prev;
        return size + prev;
    }, 0);
}
