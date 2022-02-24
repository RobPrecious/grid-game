import React from 'react'
import { GridItem } from './GameTypes'
import { generateGrid } from './GridUtils'

function Game() {
    const [grid, setGrid] = React.useState<GridItem[]>(generateGrid(6))
    return <div></div>
}

export default Game
