import {getPiece, pieceLetter} from './get-piece';

export function square(row, col, pieceLetterInput = '', fromPosition = false) {
    let isBlack = (row + col) % 2 !== 0;
    let color = isBlack ? "#53382c" : "#8bb1c3";
    let squareAttr = isBlack ? "black" : "white";
    let square = document.createElement("div");
    let pieceType = fromPosition ? getPiece(pieceLetterInput) : pieceLetter(row, col);
    square.setAttribute("data-val", pieceType);
    square.setAttribute("sq-color", squareAttr);
    square.setAttribute("position", `${row}-${col}`);
    square.classList.add("square");
    square.innerHTML = pieceType ? pieceType : '';
    square.style.backgroundColor = color;
    square.style.width = "100px";
    square.style.height = "100px";
    return square;
}


export function squareIsOccupied(square) {
    return square[0].dataset.val.length > 0;
}
