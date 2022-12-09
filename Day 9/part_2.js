const fs = require('fs');

const input = fs.readFileSync('./input')
    .toString('utf8')
    .trim()
    .split('\n')
    .map(line => [ line.split(' ')[0], Number(line.split(' ')[1]) ]);

const knots = Array(10).fill(0).map(() => [0, 0]);
const visited = [ [0, 0] ];

const pos = (num) => num < 0 ? -num : num;
const diff = (num1, num2) => pos(num2 > num1 ? num2 - num1 : num1 - num2);

for (const action of input) {
    for (let i = 0; i < action[1]; i++) {
        for (let j = 0; j < knots.length-1; j++) {
            const [front, back] = [knots[j], knots[j+1]];

            if (j == 0) {
                switch(action[0]) {
                    case 'U':
                        front[1]++;
                        break;
                    case 'D':
                        front[1]--;
                        break;
                    case 'L':
                        front[0]--;
                        break;
                    case 'R':
                        front[0]++;
                        break;
                    default: throw `Unknown direction ${action[0]}`;
                }
            }

            if (front[0] == back[0] && front[1] == back[1]) {}
            else if ((diff(back[0], front[0]) >= 2 && diff(back[1], front[1]) >= 1) ||
                    (diff(back[1], front[1]) >= 2 && diff(back[0], front[0]) >= 1)
            ) {
                back[0] += back[0] > front[0] ? -1 : 1;
                back[1] += back[1] > front[1] ? -1 : 1;
            }
            else if (back[1] > front[1]+1) back[1]--;
            else if (back[1] < front[1]-1) back[1]++;
            else if (back[0] > front[0]+1) back[0]--;
            else if (back[0] < front[0]-1) back[0]++;
        }

        const last = knots.at(-1);
        if (!visited.filter(v => v[0] == last[0] && v[1] == last[1]).length) {
            visited.push([...last]);
        }

        // Crude visualization
        /*
        for (let y = -10; y < 21; y++) {
            for (let x = -15; x < 26; x++) {
                if (x == knots[0][0] && y == knots[0][1]) process.stdout.write('F');
                else if (x == knots[9][0] && y == knots[9][1]) process.stdout.write('B');
                else if (knots.filter(k => k[0] == x && k[1] == y).length) process.stdout.write('S');
                else if (visited.filter(k => k[0] == x && k[1] == y).length) process.stdout.write('#');
                else process.stdout.write('*');
            }
            process.stdout.write('\n');
        }
        process.stdout.write('\n\n');
        */
    }
}

console.log(visited.length);
