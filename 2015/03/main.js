const path = require("path")
const fs = require("fs")

/**
    Example values

    > = 2 -> initial house + 1
    ^>v< = 4 -> initial + 3 (initial receives two times)
    ^v^v^v^v^v = 2 -> initial + 1 (initial and above receives multiples times)
*/

const filename = "example"
const file = "^>v<".trim().split("")
    // fs.readFileSync(path.resolve(__dirname, filename), { encoding: "utf-8" }).trim().split("")

const mapped_values = file.map(char => {
    switch (char) {
        case "^":
            return [1, 0]
        case ">":
            return [0, 1]
        case "<":
            return [0, -1]
        case "v":
            return [-1, 0]
        default:
            break
    }
})

function main() {
    const visited = [[true]]
    const negativeValues = []

    for (const house of mapped_values) {
        const [y, x] = house
        console.log({ y, x })
        if (x < 0) {
            negativeValues[y][(-1) * x] = true
            continue
        } else if (y < 0) {
            negativeValues[(-1) * y][x] = true
            continue
        } else if (x < 0 && y < 0) {
            negativeValues[(-1) * y][(-1) * x] = true
            continue
        }
        visited[y][x] = true
    }
}


console.log({ mapped_values, file})
main()
// console.log(visited)
