const fs = require("fs");

const input = fs.readFileSync("./input").toString("utf8").trim();
const buffer = [];

for (const i in input.split("")) {
    const char = input.charAt(i);

    buffer.push(char);
    if (buffer.length > 4) {
        buffer.shift();
        if (Array.from(new Set(buffer)).length == buffer.length) return console.log(Number(i) + 1);
    }
}
