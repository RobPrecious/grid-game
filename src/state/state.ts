import { writeJsonFile } from 'write-json-file'

export interface Game {
    player_name: string
    timestamp: Date
    score: number
}

export interface State {
    games: Game[]
}

export const addGame = async () => {
    await writeJsonFile('state.json', { foo: true })
}
