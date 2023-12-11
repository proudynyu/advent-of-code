import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const filePath = resolve(__dirname, 'example.txt')
const fileLines = readFileSync(filePath, 'utf-8').split('\n').filter(Boolean)

const max_quantity = {
    red: 12,
    blue: 14,
    green: 13
} as const

function getGameId(line: string): string {
    const [gameWithId] = line.split(':')

    return gameWithId.split(' ')[1]
}

function getGames(line: string): string[] {
    return line.split(':')[1].trim().split(';')
}

function main_pt1(contents: string[]) {
    const games = contents.map(content => {
        return {
            id: getGameId(content),
            games: getGames(content)
        }
    })

    console.log(games)
}


main_pt1(fileLines)
