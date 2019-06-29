/*
 game class manages games,
 score
 moves


*/

class Game {
    constructor (setState) {
        this.score = 0;
        this.highScore = 0;
        this.history = [];
        this.time = 10;
        this.interval = null;
        this.testSquare = {rank: undefined, file: undefined}
        this.gameInProgress = false
        this.setState = setState
    }
}

class Board {
    constructor () {
        this.squaresUsed = 0
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.squares = []
        this.ranks = {0: '8', 1: '7', 2: '6', 3: '5', 4: '4', 5: '3', 6: '2', 7: '1'}
        this.files = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H'}
        this.rows = {8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7}
        this.columns = {A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7}
    }
    init () {
        this.board.map((row, i) => (
            row.map((col, j) => (
                this.squares.push(this.createSquare(i, j))
            ))
        ))
    }
    createSquare (row, column) {
        return new Square(this.ranks[row], this.files[column])
    }
    getRankAndFile(row, column) {
        return {rank: this.ranks[row], file: this.files[column]}
    }
    getRandomRowAndColumn() {
        const randomRow = Math.floor(Math.random() * 8)
        const randomColumn = Math.floor(Math.random() * 8)
        return {row: randomRow, column: randomColumn}
    }
    chooseNewSquare() {
        let picking = true
        let newRow
        let newColumn
        while (picking) {
            let {row, column} = this.getRandomRowAndColumn()
            if (!this.checkSquare(row, column)) {
                picking = false
                newRow = row
                newColumn = column
            }
        }
        this.setSquare(newRow, newColumn)
        this.squaresUsed ++
        return this.getRankAndFile(newRow, newColumn)
    }
    setSquare(row, column) {
        this.board[row][column] = 1
    }
    checkSquare(row, column) {
        return this.board[row][column] === 1
    }
}

class Square {
    constructor (rank, file) {
        const lightSquares = [
            "A8", "C8", "E8", "G8", "B7", "D7", "F7", "H7",
            "A6", "C6", "E6", "G6", "B5", "D5", "F5", "H5",
            "A4", "C4", "E4", "G4", "B3", "D3", "F3", "H3",
            "A2", "C2", "E2", "G2", "B1", "D1", "F1", "H1"
        ]
        this.type = lightSquares.indexOf(file + rank) > -1 ? 'light' : 'dark'
        this.rank = rank
        this.file = file
        this.playable = true
        this.guess = {rank: null, file: null}
    }
    markPlayed () {
        this.playable = false
    }
    guess(rank, file) {
        this.guess.rank = rank
        this.guess.file = file
        this.markPlayed()
        return this.guess.rank === this.rank && this.guess.file === this.file
    }
}

export {Game, Board, Square}
