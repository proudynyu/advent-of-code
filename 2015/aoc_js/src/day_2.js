const path = require("path")
const fs = require("fs")

const filename = "input"
const file = fs.readFileSync(path.resolve(__dirname, filename), {
    encoding: 'utf-8'
}).split("\n").filter(Boolean)

const formule = (x, y) => x*y

function resolve_01() {
    const splitted_lines = file.map(line => {
        return line.split("x").map(Number)
    })

    const sum_list = []
    for (const line of splitted_lines) {
        const inner_sum = []
        const [w,l,h] = line
        const sides = []
        inner_sum.push(
            formule(w, l),
            formule(w, h),
            formule(l, h)
        )
        const smallest_side = Math.min(...inner_sum)
        const sum = inner_sum.reduce((prev, curr) => {
            return prev + 2 * curr
        }, 0)
        sum_list.push(sum + smallest_side)
    }

    return sum_list.reduce((prev, curr) => {
        return prev + curr
    }, 0)
}

const get_perimeters_sides = (line) => {
    const perimeters = []
    for (let i = 0; i < line.length; i++) {
        for (let j = 0; j < line.length; j++) {
            if (i !== j){
                perimeters.push(2 * line[i] + 2 * line[j])
            }
        }
    }
    const min_perimeter = Math.min(...perimeters)
    const values = []
    for (let i = 0; i < line.length; i++) {
        for (let j = 0; j < line.length; j++) {
            if (2 * line[i] + 2 * line[j] === min_perimeter && i !== j){
                values.push(line[i], line[j])
                break
            }
        }
    }
    return values
}

function resolve_02() {
    const splitted_lines = file.map(line => {
        return line.split("x").map(Number)
    })
    const sum_list = []
    for (const line of splitted_lines) {
        const [w,l,h] = line
        const [x, y] = get_perimeters_sides(line)
        const ribbon_size = 2*x + 2*y + w*l*h
        sum_list.push(ribbon_size)
    }
    return sum_list.reduce((prev, curr) => {
        return prev + curr
    }, 0)
}

console.log({
    ex01: resolve_01(),
    ex02: resolve_02()
})

