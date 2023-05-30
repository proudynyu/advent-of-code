
export function convertCharCodesLowercaseScales(charCode: number) {
    const slope = (26 - 1) / (122 - 97)
    return 1 + (slope * (charCode - 97))
}

export function convertCharCodesUppercaseScales(charCode: number) {
    const slope = (52 - 27) / (90 - 65)
    return 27 + (slope * (charCode - 65))
}

export function verifyLetterPoint(letter: string): number {
    const LP = new RegExp(/[a-z]/)
    const isLowerCaseLetter = LP.test(letter)

    if(isLowerCaseLetter) {
        return (convertCharCodesLowercaseScales(letter.charCodeAt(0)))
    }

    return (convertCharCodesUppercaseScales(letter.charCodeAt(0)))
}
