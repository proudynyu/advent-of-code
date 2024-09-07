const fs = require("node:fs")
const path = require("node:path")

const filename = "input"
const file =
    fs.readFileSync(
        path.resolve(__dirname, filename),
        {
            encoding: "utf-8"
        }
    )
    .trim()
    .split("\n")

// const vowels = "aeiou".split("")
//
// function duplicatedVowel(line, vowels) {
//     const countVowelsObject = {}
//     for (let letter of line) {
//         if(vowels.includes(letter)) {
//             if (countVowelsObject[letter]) {
//                 countVowelsObject[letter]++
//             } else {
//                 countVowelsObject[letter] = 1
//             }
//         }
//     }
//     return Object.values(countVowelsObject)
//         .reduce((prev, curr) => prev + curr, 0) >= 3
// }
//
// function notAllowedLetters(line) {
//     return !["ab", "cd", "pq", "xy"].some(pair => line.includes(pair))
// }
//
// function createDoubleAlphabet() {
//     let alphabet = ""
//     for (let i = 65; i <= 90; i++) {
//         alphabet = alphabet + String.fromCharCode(i).toLowerCase()
//     }
//     const double_alpha = alphabet
//         .split("")
//         .map(char => char + char)
//     return double_alpha
// }
//
// function hasDoubleAlphaLetter(line, double_alpha) {
//     for (let double of double_alpha) {
//         if (line.includes(double)) {
//             return true
//         }
//     }
//     return false
// }
//     
// const double_alpha = createDoubleAlphabet()
// const file_with_allowed = file
//     .filter(notAllowedLetters)
//     .filter(line => hasDoubleAlphaLetter(line, double_alpha))
//     .filter(line => duplicatedVowel(line, vowels))

// Code Reviewed part_one
const vowels = new Set("aeiou") // <-- O(1)

function hasThreeVowels(line) {
    let vowelCount = 0
    for (const char of line) {
        if (vowels.has(char)) {
            vowelCount++
        }
        if (vowelCount >= 3) return true
    }
    return false
}

function noForbiddenSubstrings(line) {
    const forbidden = ["ab", "cd", "pq", "xy"]
    return forbidden.every(pair => !line.includes(pair))
}

function hasDoubleLetter(line) {
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
            return true
        }
    }
    return false
}

const file_with_allowed = file
    .filter(noForbiddenSubstrings)
    .filter(hasDoubleLetter)
    .filter(hasThreeVowels)

console.log({ 
    len: file.length,
    new_len: file_with_allowed.length,
})
