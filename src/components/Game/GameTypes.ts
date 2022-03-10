export interface GameState {
    startTime: Date
    endTime?: Date
    numberOfTurns: number
    playerName: string
}

export interface GridItem {
    letter: string
    found: boolean
}

export const initialGame = {
    startTime: new Date(),
    numberOfTurns: 0,
    playerName: '',
}
