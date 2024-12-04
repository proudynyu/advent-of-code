import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const filePath = resolve(__dirname, 'input')
const fileLines = readFileSync(filePath, 'utf-8').split('\n').filter(Boolean)

const max_quantity = {
    red: 12,
    blue: 14,
    green: 13
} as const

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

function main_1(fileLines: string[]) {
    return fileLines
        .map(line => {
            const gameId: string = line.split(":")[0].trim().split(" ")[1].trim()
            const games: string = line.split(":")[1].trim()

            return [gameId, games]
        })
        .map(mapped => {
            const id = mapped[0]
            const games = mapped[1]
            const splittedGames = games.split(";").map(game => game.split(",").map(g => g.trim())).flat()

            return { id, games: splittedGames}
        })
        .map(({id, games}) => {
            const result: boolean[] = []

            games.forEach(game => {
                const [qty, color] = game.split(" ")

                if (color === "blue" && Number(qty) <= max_quantity.blue) {
                    result.push(true)
                } else if (color === "red" && Number(qty) <= max_quantity.red) {
                    result.push(true)
                } else if (color === "green" && Number(qty) <= max_quantity.green){
                    result.push(true)
                } else {
                   result.push(false)
                }
            })

            const isCorretGame = result.every(value => value)

            return {
                id,
                isCorretGame
            }
        })
        .filter(game => game.isCorretGame)
        .map(game => game.id)
        .reduce((prev, curr) => (prev + Number(curr)), 0)
}

console.log(main_1(fileLines))
