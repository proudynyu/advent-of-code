const fs = require("node:fs")
const path = require("node:path")
const crypto = require("node:crypto")

// abcdef -> abcdef609043 -> 000001dbbfa
// pqrstuv -> pqrstuv1048970 -> 000006136ef
// my puzzle input: iwrupvqb
const filename = "iwrupvqb"
const part_one = "00000"
const part_two = "000000"

function findHash(expected) {
    let md5 = ""
    let count = 0
    while(true) {
        const hash = crypto.createHash("md5").update(filename + String(count)).digest("hex")
        const sliced = hash.slice(0, expected.length)
        if (sliced === expected) {
            md5 = hash
            break
        }
        count ++
    }
    return { md5, count }
}

console.log(findHash(part_two))

