const path = require("path")
const fs = require("fs")

/**
    Example values

    > = 2 -> initial house + 1
    ^>v< = 4 -> initial + 3 (initial receives two times)
    ^v^v^v^v^v = 2 -> initial + 1 (initial and above receives multiples times)
*/

const filename = "example"
const file = fs.readFileSync(path.resolve(__dirname, filename), { encoding: "utf-8" }).trim().split("")

const mapped_values = file.map(char => {
    switch (char) {
        case "^":
            return [0, 1]
        case ">":
            return [1, 0]
        case "<":
            return [-1, 0]
        case "v":
            return [0, -1]
        default:
            break
    }
})

console.log(mapped_values)
