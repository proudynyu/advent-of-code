import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const filePath = resolve(__dirname, 'input.txt');
const file = readFileSync(filePath, 'utf-8');

const unparsedValues = file.split(/\n\s*/).filter(Boolean);

const shapeValues = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const scores = {
  lose: 0,
  draw: 3,
  win: 6,
};

type C = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';
type A = keyof typeof shapeValues;
type B = keyof typeof scores;

function evalInput(arg: C): A {
  switch (arg) {
    case 'A':
    case 'X':
      return 'rock';
    case 'B':
    case 'Y':
      return 'paper';
    case 'C':
    case 'Z':
      return 'scissors';
  }
}

function jokenpo(mine: string, opponent: string) {
  if (mine === opponent) return `${mine} draw`;

  if (mine === 'rock' && opponent === 'scissors') return `${mine} win`;
  if (mine === 'scissors' && opponent === 'paper') return `${mine} win`;
  if (mine === 'paper' && opponent === 'rock') return `${mine} win`;

  if (mine === 'scissors' && opponent === 'rock') return `${mine} lose`;
  if (mine === 'paper' && opponent === 'scissors') return `${mine} lose`;

  return `${mine} lose`;
}

function resolveMatch(arr: Array<string>) {
  return arr.map(item => {
    const splitedItem = item.split(' ') as C[];
    const mineShape = evalInput(splitedItem[0]);
    const opponentsShape = evalInput(splitedItem[1]);

    return jokenpo(mineShape, opponentsShape);
  });
}

const matchResolved = resolveMatch(unparsedValues);

const result = matchResolved
  .map(prev => {
    const array = prev.split(' ') as A[];
    const shapeUsed = array[0];
    const matchResult = array[1] as B;

    return scores[matchResult] + shapeValues[shapeUsed];
  })
  .reduce((prev, curr) => {
    return prev + curr;
  }, 0);

console.log(result);
