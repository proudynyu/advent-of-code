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
] as const;

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

function part_two(file: string) {
  const fileLines = file.split('\n');

  // the problem is here
  const reg = new RegExp(
    '(one|two|three|four|five|six|seven|eight|nine|\\d)',
    'gi',
  );

  const nums: string[] = [];

  for (let line of fileLines) {
    const match = line.match(reg);
    const result: string[] = [];

    if (match) {
      result.push(match[0], match[match.length - 1]);
    }

    const translated: string[] = [];
    for (let word of result) {
      if (Number.isNaN(Number(word))) {
        translated.push(String(TRANSLATE_NUMBER_MAP[word]));
      } else {
        translated.push(word);
      }
    }

    nums.push(translated.join(''));
  }

  const sum = nums.filter(Boolean).reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, 0);

  console.log(sum)
}

// part_one(file);
part_two(file);
