import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const fileName = 'input.txt';
const filePath = resolve(__dirname, fileName);

const file = readFileSync(filePath, 'utf-8');

const lines = file.split('\n').filter(Boolean)

const LP = new RegExp(/[a-z]/)

function convertCharCodesLowercaseScales(charCode: number) {
    const slope = (26 - 1) / (122 - 97)
    return 1 + (slope * (charCode - 97))
}

function convertCharCodesUppercaseScales(charCode: number) {
    const slope = (52 - 27) / (90 - 65)
    return 27 + (slope * (charCode - 65))
}

function verifyLetterPoint(letter: string): number {
    const isLowerCaseLetter = LP.test(letter)

    if(isLowerCaseLetter) {
        return (convertCharCodesLowercaseScales(letter.charCodeAt(0)))
    }

    return (convertCharCodesUppercaseScales(letter.charCodeAt(0)))

}

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

