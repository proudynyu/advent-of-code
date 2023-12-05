import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const fileName = "input_test.txt";
const filePath = resolve(__dirname, fileName);

const file = readFileSync(filePath, "utf-8");

const [crates, commands] = file.split("\n\n")

function createCratesArray(c: string) {
    //     [D]    
    // [N] [C]    
    // [Z] [M] [P]
    //  1   2   3 
    //  => [
    //      [Z, N]
    //      [M, C, D]
    //      [P]
    //     ]

    const lines = c.split("\n")

    const parts = lines.map(line => {
        const p1 = line.slice(0, 4)
        const p2 = line.slice(4, 8)
        const p3 = line.slice(8, line.length)

        return [p1, p2, p3]
    })

    const regex = new RegExp(/\s+?/g)

    const crates = [
        [], [], []
    ]
    const filtered_part = parts.map(part => part.map(p => p.replace(regex, "")))

    for (let x = 0; x < crates.length; x++) {
        for (let y = 0; y < crates.length; y++) {
            crates[y].push(filtered_part[x][y])
        }
    }

    return crates.map(c => c.filter(Boolean))
}

// quantity, containerFrom, containerTo
// [1, 2, 1]
function parseInstructions(commands: string) {
    const instructions = [] as string[][]
    commands.split("\n").forEach(command => {
        const commandsNumbers = command.replace(/\D+/g, "").split("")
        if (commandsNumbers.length)
            instructions.push(commandsNumbers)
    })

    return instructions
}

const cratesArray = createCratesArray(crates)
const instructions = parseInstructions(commands)

console.log({ cratesArray, instructions })
