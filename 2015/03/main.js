const path = require("path")
const fs = require("fs")

/**
    Example values

    > = 2 -> initial house + 1
    ^>v< = 4 -> initial + 3 (initial receives two times)
    ^v^v^v^v^v = 2 -> initial + 1 (initial and above receives multiples times)
*/

const filename = "input"
const file = 
    // "^v".trim().split("")
    fs.readFileSync(path.resolve(__dirname, filename), { encoding: "utf-8" }).trim().split("")

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

function part_one() {
    const visited = {'0,0': 1}
    const position = [0,0]
    for (const house of mapped_values) {
        const [y, x] = house
        position[0] += y
        position[1] += x
        if (visited[position]) {
            visited[position] = visited[position] + 1
            continue
        }
        visited[position] = 1
        
    }
    console.log({ visited: Object.keys(visited).length })
}

function part_two() {
    const visited_santa = {'0,0': 2}
    const position_santa = [0,0]

    const visited_robo = {}
    const position_robo = [0,0]

    for (let i = 0; i < mapped_values.length; i++) {
        const [y, x] = mapped_values[i]
        if (i % 2 === 0) {
            position_santa[0] += y
            position_santa[1] += x
            if (visited_santa[position_santa]) {
                visited_santa[position_santa] = visited_santa[position_santa] + 1
                continue
            }
            visited_santa[position_santa] = 1
            continue
        }
            position_robo[0] += y
            position_robo[1] += x
            if (visited_robo[position_robo]) {
                visited_robo[position_robo] = visited_robo[position_robo] + 1
                continue
            }
            visited_robo[position_robo] = 1
    }
    const santa = Object.keys(visited_santa)
    const robo = Object.keys(visited_robo)

    const set = new Set([...santa, ...robo]).size
    console.log({ 
        set
    })

}

// part_one()
part_two()
