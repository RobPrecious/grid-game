import { GridItem } from './GameTypes'

const generateGrid = (size: number): GridItem[] => {
    const baseGrid = Array.from(Array(size)).map(
        (_, index): GridItem => ({
            letter: String.fromCharCode(65 + index),
            found: false,
        })
    )
    return shuffle([...baseGrid, ...baseGrid])
}

const shuffle = (array: GridItem[]): GridItem[] => {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

export { generateGrid }
