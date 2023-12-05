import {resolve} from 'node:path';
import {readFileSync} from 'node:fs';

type Pair = {
  x: number;
  y: number;
};

const fileName = 'input1.txt';
const filePath = resolve(__dirname, fileName);
const file = readFileSync(filePath, 'utf-8');

const lines = file.split('\n').filter(Boolean);

function parseSection(section: string): Pair {
  const [init, end] = section.split('-');
  return {x: Number(init), y: Number(end)};
}

function sectionByPair(line: string) {
  const [first, second] = line.split(',');

  return {
    f: parseSection(first),
    s: parseSection(second),
  };
}

function itFullycontains(f: Pair, s: Pair) {
  return f.x <= s.x && f.y >= s.y;
}

// part 1
function partOne() {
  let sum: number = 0;

  for (let line of lines) {
    const {f, s} = sectionByPair(line);

    if (itFullycontains(f, s) || itFullycontains(s, f) || itOverlaps(f, s)) {
      sum += 1;
    }
  }
  console.log(sum);
}

function itOverlaps(f: Pair, s: Pair): boolean {
  let overlaps = false;
  if (!(f.y < s.x || s.y < f.x)) {
    overlaps = true;
  }

  return overlaps;
}

function partTwo() {
  let sum: number = 0;
  for (let line of lines) {
    const {f, s} = sectionByPair(line);

    if (itOverlaps(f, s)) {
      sum += 1;
    }
  }
  console.log(sum);
}

partOne();
partTwo();
