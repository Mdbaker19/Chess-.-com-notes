let currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
let baseFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
let pieceTestFen = "8/pb3k2/1PBnr3/8/8/Q7/6r1/8"
const PIECES = {
    PAWN: "pawn",
    ROOK: "rook",
    BISHOP: "bishop",
    KNIGHT: "knight",
    QUEEN: "queen",
    KING: "king"
}

const WHITE = "w";
const BLACK = "b";

let blackColorInput = document.getElementById("black-color");
let blackColor = blackColorInput.value;
let whiteColorInput = document.getElementById("white-color");
let whiteColor = whiteColorInput.value;



function square(row, col, pieceLetterInput = '') {
    let isBlack = (row + col) % 2 !== 0;
    let color = isBlack ? blackColor : whiteColor;
    let squareAttr = isBlack ? "black" : "white";
    let square = document.createElement("div");
    let pieceType = getPiece(pieceLetterInput);
    square.setAttribute("data-val", pieceType);
    square.setAttribute("data-color", squareAttr);
    square.setAttribute("data-position", `${row}-${col}`);
    square.classList.add("square");
    square.innerHTML = pieceType ? pieceType : '';
    square.style.backgroundColor = color;
    square.style.width = "100px";
    square.style.height = "100px";
    return square;
}

function getPiece(pieceInput) {
    let [color, pieceType] = pieceInput.split("_");

    switch (pieceType) {
        case "p":
            return `<img class="piece-img" alt="piece" src="img/${color}pawn.png">`;
        case "r":
            return `<img class="piece-img" alt="piece" src="img/${color}rook.png">`;
        case "n":
            return `<img class="piece-img" alt="piece" src="img/${color}knight.png">`;
        case "b":
            return `<img class="piece-img" alt="piece" src="img/${color}bishop.png">`;
        case "q":
            return `<img class="piece-img" alt="piece" src="img/${color}queen.png">`;
        case "k":
            return `<img class="piece-img" alt="piece" src="img/${color}king.png">`;
    }
}



function getPositionFromFen(board, fenString, fallBackFn, squareEvent) {
    board.html("");
    fenString = fenString.split("/").join("");
    // from invalid username, call normal create board function
    if(!fenString) {
        fallBackFn(board);
        squareEvent();
        return -1;
    }
    currentFen = fenString;
    let currentPieceFromFen = '';
    let fenIdx = 0;

    for(let rows = 0; rows < 8; rows++) {
        for(let cols = 0; cols < 8; cols++) {
            let curr = fenString[fenIdx];
            if(!curr) return;
            if(isNaN(parseInt(curr))) {
                currentPieceFromFen = curr === curr.toLowerCase()
                    ? `${BLACK}-_${curr}`
                    : `${WHITE}-_${curr.toLowerCase()}`;
                board.append(square(rows, cols, currentPieceFromFen));
            } else {
                let [newRows, newCols] = createBlankSquares(board, rows, cols, parseInt(curr));
                cols = newCols;
                rows = newRows;
            }
            fenIdx++;
        }
    }
    squareEvent();
}

function createBlankSquares(board, rows, cols, amountOfBlankSquares) {
    if(cols > 7) {
        cols = 0;
        rows++;
    }
    if(amountOfBlankSquares <= 1) {
        board.append(square(rows, cols, ''));
        return [rows, cols];
    }
    board.append(square(rows, cols, ''));
    return createBlankSquares(board, rows, cols + 1, amountOfBlankSquares - 1);
}

// after notes are submitted by the user, save the FEN, possibly to a DB or something by user








const PIECE_TABLE = {
    king: 'k',
    queen: 'q',
    bishop: 'b',
    rook: 'r',
    pawn: 'p',
    knight: 'n'
}

function readFenFromBoard(board) {
    let fen = "";
    let count = 0;
    let colCounter = 0; // if this >= 8 add the '/'
    const boardArr = board[0].childNodes;
    for(let i = 0; i < boardArr.length; i++) {
        colCounter++;
        if(colCounter === 9) {
            fen += '/';
            colCounter = 0;
        }
        let currSquare = boardArr[i];
        let potentialPiece = currSquare.dataset.val;
        if(potentialPiece !== 'undefined') {
            if(count !== 0) {
                fen += count;
                count = 0;
            }
            let [pieceColor, pieceType] = parseIt(potentialPiece); // [b, rook]
            fen +=  pieceColor === 'b'
                ? PIECE_TABLE[pieceType]
                : PIECE_TABLE[pieceType].toUpperCase();
        } else {
            count++;
            if(count === 8) {
                fen += count;
                count = 0;
            }
        }
    }
    return fen;
}


function parseIt(squareContent) {
    return squareContent.split(" ")[2].split("/")[1].split(".")[0].split("-");
}



function generateMoves(board, pieceType, row, col) {

    switch (pieceType) {
        case 'rook':
            return rookMoves(board, row, col);
        default:
            console.log("only rook for now and black pieces");
            return;
    }
}

/**
 a rook can move with offsets { -1, +1, -8, +8 } up to the edges of the board
 this will be for later.. for now, kinda meh code
 The isOccupied check will break after the move is added to the list
 as when a piece is in the path, you can not move through it as a rook
 @param board - {object}
 @param currRow - {string}
 @param currCol - {string}
 @return moveList - {array} - ['1-1', '5-6']
 * */
function rookMoves(board, currRow, currCol) {
    let moveList = [];
    for(let i = currRow - 1; i >= 0; i--) {
        moveList.push(`${i}-${currCol}`);
        if(isOccupied(getSquareFromBoard(board, [i, currCol]))) break;
    }
    for(let i = currCol - 1; i >= 0; i--) {
        moveList.push(`${currRow}-${i}`);
        if(isOccupied(getSquareFromBoard(board, [currRow, i]))) break;
    }
    for(let i = currRow + 1; i < 8; i++) {
        moveList.push(`${i}-${currCol}`);
        if(isOccupied(getSquareFromBoard(board, [i, currCol]))) break;
    }
    for(let i = currCol + 1; i < 8; i++) {
        moveList.push(`${currRow}-${i}`);
        if(isOccupied(getSquareFromBoard(board, [currRow, i]))) break;
    }
    return moveList;
}

// take that list, loop over the board, highlight the squares
function showMovesOnBoard(board, currPositionArr, moveList = []) {
    boardChildren(board).forEach(square => {
        let position = square.dataset.position;
        if(position === currPositionArr.join("-")) return;
        if(moveList.includes(position)) {
            if(isOccupied(square)) {
                square.classList.add("can-capture-piece");
            } else {
                square.dataset.color === 'black'
                    ? square.classList.add("can-move-to-black")
                    : square.classList.add("can-move-to-white");
            }
        }
    });
}

function resetBoardClasses(board) {
    boardChildren(board).forEach(square => {
        square.classList.remove('can-move-to-black');
        square.classList.remove('can-move-to-white');
        square.classList.remove('can-capture-piece');
    });
}

function getSquareFromBoard(board, currPositionArr) {
    // find the square on the board for the given row & col
    let s = '';
    boardChildren(board).forEach(square => {
        let position = square.dataset.position;
        if(position === currPositionArr.join("-")) s = square;
    });
    return s;
}

function isOccupied(square) {
    return square.dataset.val !== 'undefined';
}

// to add the +1 to each for the 0th index on the board
function actualPosition(arr) {
    return arr.map(a => parseInt(a));
}

function boardChildren(board) {
    return Array.from(board[0].children);
}
