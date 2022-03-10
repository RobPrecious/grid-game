import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Game from '../Game/Game'
import { GameState } from '../Game/GameTypes'

const StyledGameScreen = styled.div`
    margin: 0 auto;
`

const GameScreen = () => {
    const [gameRecord, setGameRecord] = React.useState<GameState[]>([
        // { numberOfTurns: 5, playerName: 'Rob', startTime: new Date() },
        // { numberOfTurns: 4, playerName: 'Graeme', startTime: new Date() },
        // { numberOfTurns: 2, playerName: 'Graeme', startTime: new Date() },
        // { numberOfTurns: 1, playerName: 'Graeme', startTime: new Date() },
    ])
    const [playerName, setPlayerName] = React.useState<string>('')

    const saveGame = (game: GameState) => {
        setGameRecord([...gameRecord, game])
    }

    return (
        <StyledGameScreen>
            <Game playerName={playerName} saveGame={saveGame} />
            <label>
                Player Name
                <input
                    type="text"
                    name="player-name"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setPlayerName(event.target.value)
                    }
                />
            </label>
            <ol>
                {gameRecord
                    .sort((a, b) => a.numberOfTurns - b.numberOfTurns)
                    .map((game: GameState) => {
                        return (
                            <li>
                                {game.playerName} {game.numberOfTurns} (
                                {game.endTime
                                    ? (game.endTime.getTime() -
                                          game.startTime.getTime()) /
                                      1000
                                    : 0}
                                s)
                            </li>
                        )
                    })}
            </ol>
        </StyledGameScreen>
    )
}

export default GameScreen
