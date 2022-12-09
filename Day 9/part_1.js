const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => [ line.split(' ')[0], Number(line.split(' ')[1]) ]);

//            X  Y
const head = [0, 0];
const tail = [0, 0];
const visited = [ [0, 0] ];

const pos = (num) => num < 0 ? -num : num;
const diff = (num1, num2) => pos(num2 > num1 ? num2 - num1 : num1 - num2);

for (const action of input) {
    for (let i = 0; i < action[1]; i++) {
        const oldPos = [...head];
        switch(action[0]) {
            case 'U':
                head[1]++;
                break;
            case 'D':
                head[1]--;
                break;
            case 'L':
                head[0]--;
                break;
            case 'R':
                head[0]++;
                break;
            default: throw `Unknown direction ${action[0]}`;
        }

        if (head[0] == tail[0] && head[1] == tail[1]) continue;
        else if (diff(tail[0], head[0]) >= 2 && diff(tail[1], head[1]) >= 1
              || diff(tail[0], head[0]) >= 1 && diff(tail[1], head[1]) >= 2)
        {
            tail[0] = oldPos[0];
            tail[1] = oldPos[1];
        }
        else if (tail[1] > head[1]+1) tail[1]--;
        else if (tail[1] < head[1]-1) tail[1]++;
        else if (tail[0] > head[0]+1) tail[0]--;
        else if (tail[0] < head[0]-1) tail[0]++;

        if (!visited.filter(v => v[0] == tail[0] && v[1] == tail[1]).length) {
            visited.push([...tail]);
        }
    }
}

console.log(visited.length);
