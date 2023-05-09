import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const filePath = resolve(__dirname, "input.txt");
const file = readFileSync(filePath, "utf-8");

const matchs: string[] = file.trim().split("\n");

const valuesForScore = {
    "X": 1,
    "Y": 2,
    "Z": 3,
    "win": 6,
    "lose": 0,
    "draw": 3
}

const draw = {
    "A": "X",
    "B": "Y",
    "C": "Z",
}

const beats = {
    "A": "Z",
    "B": "X",
    "C": "Y",
}

const rules = {
    "X": 0,
    "Y": 3,
    "Z": 6,
}

const loses = {
    "A": "Y",
    "B": "Z",
    "C": "X",
}

type EnemyChoice = "A" | "B" | "C"
type Choice = "X" | "Y" | "Z" 

function firstPart(): [number, number] {
    

    const start = performance.now()
    let somatoryForMatchs = 0;
    for (let match of matchs) {
        let sum = 0;
        const [enemyChoice, myChoice] = match.split(" ") as [EnemyChoice, Choice];
        const itDraw = draw[enemyChoice] === myChoice
        const itWins = !itDraw && beats[enemyChoice] !== myChoice

        sum += valuesForScore[myChoice];
        if(itWins) {
            sum += valuesForScore.win;
        }

        if (itDraw) {
            sum += valuesForScore.draw
        }

        somatoryForMatchs += sum;
    }
    return [performance.now() - start, somatoryForMatchs]
}

function secondPart(): [number, number] {
    const start = performance.now()

    let somatoryForMatchs = 0;
    for (let match of matchs) {
        const [enemyChoice, matchRule] = match.split(" ") as [EnemyChoice, Choice];

        let sum = rules[matchRule];
        switch (matchRule) {
            case 'X':
                sum += valuesForScore[beats[enemyChoice]]
                break
            case 'Y': 
                const drawValue = valuesForScore[draw[enemyChoice]] as number
                sum += drawValue
                break
            case 'Z':
                const winValue = valuesForScore[loses[enemyChoice]] as number
                sum += winValue
                break
        }

        somatoryForMatchs += sum
    }

    return [performance.now() - start, somatoryForMatchs]
}

// For part one
console.log(firstPart())

// For part two
console.log(secondPart())
