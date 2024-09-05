const fs = require("node:fs")
const path = require("node:path")

const filename = "example"
const file =
    fs.readFileSync(
        path.resolve(__dirname, filename),
        {
            encoding: "utf-8"
        }
    )
    .trim()
    .split("\n")

const vowels = "aeiou".split("")

function notAllowedLetters(line) {
    return !["ab", "cd", "pq", "xy"].some(pair => line.includes(pair))
}

function createDoubleAlphabet() {
    let alphabet = ""
    for (let i = 65; i <= 90; i++) {
        alphabet = alphabet + String.fromCharCode(i).toLowerCase()
    }
    const double_alpha = alphabet
        .split("")
        .map(char => char + char)
    return double_alpha
}

function hasDoubleVowels(line, double_alpha) {
    for (let double of double_alpha) {
        if (line.includes(double)) {
            return true
        }
    }
    return false
}
    
const double_alpha = createDoubleAlphabet()
const file_with_allowed = file
    .filter(notAllowedLetters)
    .filter(line => hasDoubleVowels(line, double_alpha))

console.log({ file, len: file.length, file_with_allowed, new_len: file_with_allowed.length })
