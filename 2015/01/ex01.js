const assert = require("assert")
const path = require("path")
const fs = require("fs")

const filename = "input"
const file = fs.readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })

function partOne(payload) {
    return payload
        .split("\n")[0]
        .split("")
        .reduce((prev, curr) => {
            if (curr === "(") {
                return prev + 1
            }
                return prev - 1
        }, 0)
}

function partTwo(payload) {
    const floors =  payload
        .split("\n")[0]
        .split("")
        .map(n => n === "(" ? 1 : -1)

    let count = 0
    let position = 0
    for (let i = 0; i < floors.length; i++) {
        position = i
        count += floors[i]
        if (count === -1) {
            break
        }
    }
    return position + 1
}

const part_one = partOne(file)
const part_two = partTwo(file)
console.log({one: part_one, part_two})
