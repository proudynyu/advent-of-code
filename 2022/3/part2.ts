import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import { verifyLetterPoint } from './utils';

const fileName = 'input_2.txt';
const filePath = resolve(__dirname, fileName);

const file = readFileSync(filePath, 'utf-8');

const lines = file.split('\n').filter(Boolean);

function divideLinesInGroupOfThree(lines: string[]) {
    const groupOfThree: string[] = [];
    let group = '';

    for (let i = 0; i < lines.length; i++) {
        if ((i + 1) % 3 === 0) {
            group = group + lines[i];
            groupOfThree.push(group);
            group = '';
        } else {
            group = group + lines[i] + '\n';
        }
    }

    return groupOfThree;
}

function checkWichLetterBelongsToAll(
    first: string,
    second: string,
    third: string,
): string {
    const letters = first.split('');

    if (!third || !second) {
        return '';
    }

    for (let letter of letters) {
        if (second.includes(letter) && third.includes(letter)) {
            return letter;
        }
    }

    return '';
}

const groupOfThree = divideLinesInGroupOfThree(lines);

let points: number = 0;
for (let group of groupOfThree) {
    const [first, second, third] = group.split('\n');

    const letter = checkWichLetterBelongsToAll(first, second, third);
    const letterCode = verifyLetterPoint(letter)
    points += letterCode
}
console.log(points)
