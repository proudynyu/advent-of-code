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

const translateLettersMap = {
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

function findNumberWithinWord(lines: string[]) {
  const reg = new RegExp(/(one|two|three|four|five|six|seven|eight|nine|\d)/gi);
  const lineNumbers = [] as string[][];

  for (let line of lines) {
    const matchedPattern = line.match(reg) as string[] | undefined;

    if (matchedPattern) {
      lineNumbers.push([
        matchedPattern[0],
        matchedPattern[matchedPattern.length - 1],
      ]);
    }
  }

  return lineNumbers;
}

function convertAndGlueNumbers(lineNumbers: string[][]) {
  const translated = [] as string[];
  for (let line of lineNumbers) {
    const temp = [] as string[];

    for (let num of line) {
      if (translateLettersMap[num]) {
        temp.push(String(translateLettersMap[num]));
      } else {
        temp.push(num);
      }
    }

    translated.push(temp.join(''));
  }

  return translated
}

function part_two(file: string) {
  const fileLines = file.split('\n');
  const lineNumbers = findNumberWithinWord(fileLines);
  const numberTranslated = convertAndGlueNumbers(lineNumbers);

  const sum = sumNumberFromLines(numberTranslated)

  console.log(numberTranslated, sum);
}

part_one(file);
part_two(file);
