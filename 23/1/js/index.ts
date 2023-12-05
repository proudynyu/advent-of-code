import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const isTest = !process.argv.includes('input');
const filePath = resolve(__dirname, isTest ? 'example_2.txt' : 'input.txt');

const file = readFileSync(filePath, 'utf8');

function getNumberFromLine(fileLines: string[]): string[] {
  const noDigitRegex = new RegExp(/\D/gi);
  const numList = [];

  for (let line of fileLines) {
    const parsed = line.replace(noDigitRegex, '');

    numList.push(parsed[0] + parsed[parsed.length - 1]);
  }

  return numList.filter(Boolean);
}

function sumNumberFromLines(numberList: string[]): number {
  return numberList.reduce((prev, curr) => {
    return Number(curr) + Number(prev);
  }, 0);
}

function part_one(file: string) {
  const fileLines = file.split('\n');

  const numLines = getNumberFromLine(fileLines);
  const sum = sumNumberFromLines(numLines);
  console.log(sum);
}

function removeNumberDigits(fileLines: string[]): string[] {
  const reg = new RegExp(/\d/gi);

  return fileLines.map(line => {
    return line.replace(reg, '');
  });
}

function findNumberWithinWord(lines: string[]) {
  const reg = new RegExp(/one|two|three|four|five|six|seven|eight|nine|zero/gi);
  const translate = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
  } as const;

  const nums = lines
    .map(line => {
      return line.match(reg);
    })
    .filter(Boolean);

  const result: string[] = [];
  for (let num of nums) {
    const translatedNumbers = num?.map(word => {
      // @ts-ignore
      return translate[word];
    });

    result.push(translatedNumbers?.join('') ?? '');
  }

  return result.filter(Boolean);
}

function getFirstAndLastNumbers(list: string[]): string[] {
  return list.map(num => {
    if (num.length === 1) {
      return num;
    }

    return num[0] + num[num.length - 1];
  });
}

function part_two(file: string) {
  const fileLines = file.split('\n');

  const lines = removeNumberDigits(fileLines);

  const numList = findNumberWithinWord(lines);
  const numsForSum = getFirstAndLastNumbers(numList);

  const sum = sumNumberFromLines(numsForSum);

  console.log(sum)
}

part_one(file);
part_two(file);
