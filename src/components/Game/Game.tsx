import React from 'react'
import { GridItem } from './GameTypes'
import { generateGrid } from './GridUtils'
import styled, { css } from 'styled-components'

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 16px auto;
    gap: 10px;
    width: 300px;
`
const StyledGridItem = styled.button`
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

function Game() {
    const [grid, setGrid] = React.useState<GridItem[]>(generateGrid(8))
    const [firstReveal, setFirstReveal] = React.useState<number | null>(null)
    const [secondReveal, setSecondReveal] = React.useState<number | null>(null)
    console.log(grid)

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
            setTimeout(() => {
                setFirstReveal(null)
                setSecondReveal(null)
            }, 1000)
        } else {
        }
    }

    return (
        <StyledGrid>
            {grid.map((gridItem, index) => {
                const show =
                    gridItem.found ||
                    firstReveal === index ||
                    secondReveal === index
                return (
                    <StyledGridItem
                        show={show}
                        onClick={() => handleGridItemClick(index)}
                    >
                        {show && gridItem.letter}
                    </StyledGridItem>
                )
            })}
        </StyledGrid>
    )
}

export default Game
