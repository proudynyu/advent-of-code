import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const fileName = 'input_test_2.txt';
const filePath = resolve(__dirname, fileName);

const file = readFileSync(filePath, 'utf-8');

const lines = file.split('\n').filter(Boolean)

const groupsOfThree: string[] = []
let group : string =  '';

for (let line of lines) {
    console.log(line)
}

for (let i = 0; i < lines.length; ++i) {
    if (i % 3 !== 0) {
        group += lines[i] + "\n"
    } else {
        groupsOfThree.push(group)
        group = ''
    }
}

console.log(groupsOfThree)
