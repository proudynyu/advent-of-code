import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const filePath = resolve(__dirname, 'input.txt');

const file = readFileSync(filePath, 'utf8');

const unparsedValues = file.split(/\n\s*\n/)

// could have done with reduce...
function sumsArrayValues(arr: string[] | number[]): number {
    let sum = 0;
    for (let value of arr) {
        sum += +value
    }
    return sum;
}

// part one

const sumOfValuesPerElf = []
for (let v of unparsedValues) {
    const valuesOfElf = v.split('\n');

    const sum = sumsArrayValues(valuesOfElf);
    sumOfValuesPerElf.push(sum)
}
console.log(sumOfValuesPerElf.sort()[sumOfValuesPerElf.length - 1])

// part two
const lastThreeElfs = sumOfValuesPerElf.slice(sumOfValuesPerElf.length - 3, sumOfValuesPerElf.length)
const sumOfTheThreeLast = sumsArrayValues(lastThreeElfs)
console.log(sumOfTheThreeLast)
