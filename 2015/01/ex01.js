const assert = require("assert")
const path = require("path")
const fs = require("fs")

const filename = "input"
const file = fs.readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })

function resolve(payload) {
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

const result = resolve(file)
console.log(result)
