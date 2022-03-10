import React from 'react'
import { GameState, GridItem, initialGame } from './GameTypes'
import { generateGrid } from './GridUtils'
import styled, { css } from 'styled-components'

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 16px auto;
    gap: 10px;
    width: 300px;
`
const StyledGridItem = styled.button<{ show: boolean }>`
    padding: 8px;
    border: 1px solid lightgray;
    height: 60px;
    width: 60px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 20px;
    font-family: arial;
    background: white;

    ${(props) =>
        props.show &&
        css`
            background: lightgreen;
        `}
`
interface GameProps {
    playerName: string
    saveGame: (game: GameState) => void
}

const Game = (props: GameProps) => {
    const [game, setGame] = React.useState<GameState>(initialGame)
    const [grid, setGrid] = React.useState<GridItem[]>(generateGrid(1))
    const [firstReveal, setFirstReveal] = React.useState<number | null>(null)
    const [secondReveal, setSecondReveal] = React.useState<number | null>(null)

    console.log(game)

    const reset = () => {
        setGrid(generateGrid(1))
        setGame({
            ...initialGame,
            startTime: new Date(),
            playerName: props.playerName,
        })
    }

    const handleGridItemClick = (index: number) => {
        if (firstReveal === null) {
            setFirstReveal(index)
        } else if (secondReveal === null) {
            setSecondReveal(index)
            if (grid[firstReveal].letter === grid[index].letter) {
                //found
                const newGrid = [...grid]
                newGrid[firstReveal].found = true
                newGrid[index].found = true
                setGrid(newGrid)
            }
            //check if game over
            const gameOver = grid.filter((item) => !item.found).length === 0
            if (gameOver) {
                props.saveGame({
                    ...game,
                    numberOfTurns: game.numberOfTurns + 1,
                    playerName: props.playerName,
                    endTime: new Date(),
                })
                reset()
            } else {
                const newGame = { ...game }
                newGame.numberOfTurns++
                setGame(newGame)
            }
            setTimeout(() => {
                setFirstReveal(null)
                setSecondReveal(null)
            }, 1000)
        } else {
        }
    }

    return (
        <div>
            <StyledGrid>
                {grid.map((gridItem, index) => {
                    const show =
                        gridItem.found ||
                        firstReveal === index ||
                        secondReveal === index
                    return (
                        <StyledGridItem
                            key={index}
                            show={show}
                            onClick={() => handleGridItemClick(index)}
                        >
                            {show && gridItem.letter}
                        </StyledGridItem>
                    )
                })}
            </StyledGrid>
            <p>{game.numberOfTurns} turns</p>
        </div>
    )
}

export default Game
