import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {verifyLetterPoint} from "./utils"

const fileName = 'input.txt';
const filePath = resolve(__dirname, fileName);

const file = readFileSync(filePath, 'utf-8');

const lines = file.split('\n').filter(Boolean)

function getLineHalfs(line: string) {
    const len = line.length;
    const mid = len / 2;
    const firstHalf = line.slice(0, mid);
    const secondHalf = line.slice(mid, len);

    return {
        firstHalf, secondHalf
    }
}

function checkWichLetterBelongsToBoth(firstHalf: string, secondeHalf: string): string  {
    const letters = firstHalf.split("")

    for (let letter of letters) {
        if (secondeHalf.includes(letter)) {
            return letter
        }
    }

    return  ""
}

let letterSums = 0
for (let line of lines) {
    const { firstHalf: f, secondHalf: s } = getLineHalfs(line)
    console.log(f, s)

    const letter = checkWichLetterBelongsToBoth(f, s)
    const letterCode = verifyLetterPoint(letter)

    letterSums += letterCode
}

console.log(letterSums)

