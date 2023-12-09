import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const isTest = !process.argv.includes('input');
const filePath = resolve(__dirname, isTest ? 'example.txt' : 'input.txt');

const file = readFileSync(filePath, 'utf8');

const TRANSLATE_NUMBER_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};


// no regex
function part_one(file: string) {
  const fileLines = file.split('\n').filter(Boolean)

  const arr: string[] = []
  for (let line of fileLines) {
      const letters = line.split('')
      const temp: string[] = []

      for (let letter of letters) {
          if (!Number.isNaN(Number(letter))) {
              temp.push(letter)
          }
      }

      arr.push(temp[0] + temp[temp.length - 1])
  }

  const sum = arr.reduce((prev, curr) => {
      return Number(prev) + Number(curr)
  }, 0)

  console.log(sum)
}

function part_two() {
    const fileLines = file.split('\n')
}

part_one(file);
