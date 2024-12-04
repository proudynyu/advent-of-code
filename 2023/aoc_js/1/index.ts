import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const isTest = !process.argv.includes('input');
const filePath = resolve(__dirname, isTest ? 'example_2.txt' : 'input.txt');

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
  const fileLines = file.split('\n').filter(Boolean);

  const arr: string[] = [];
  for (let line of fileLines) {
    const letters = line.split('');
    const temp: string[] = [];

    for (let letter of letters) {
      if (!Number.isNaN(Number(letter))) {
        temp.push(letter);
      }
    }

    arr.push(temp[0] + temp[temp.length - 1]);
  }

  const sum = arr.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, 0);

  console.log(sum);
}

function translateWordFromLine(line: string) {
  const NUMBERS_WORDS = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  let i = 0;
  const r: string[] = [];

  while (i <= line.length) {
    for (let word of NUMBERS_WORDS) {
      if (line.slice(i).startsWith(word)) {
        r.push(String(TRANSLATE_NUMBER_MAP[word]));
        i += word.length - 2;
        break;
      } else if (!Number.isNaN(Number(line[i]))) {
        r.push(line[i]);
        i+=line[i].length - 1;
        break;
      }
    }
    i++;
  }

  return r
}

function part_two(file: string) {
  const fileLines = file.split('\n');

  const r = fileLines.map(line => translateWordFromLine(line))
  console.log(r)

  const nums: number[] = []

  r.forEach(numArr => {
      if (numArr.length) {
          nums.push(Number(numArr[0] + numArr[numArr.length - 1]))
      }
  })

  const sum = nums.reduce((prev, curr) => {
      return prev + curr
  }, 0)

  console.log(sum)
}

// part_one(file);
part_two(file);
