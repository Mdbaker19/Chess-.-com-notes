function square(row, col, pieceLetterInput = '', fromPosition = false) {
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

function getPiece(pieceInput) {
    let [color, pieceType] = pieceInput.split("_");

    switch (pieceType) {
        case "p":
            return `<img src="../assets/img/${color}pawn.png">`;
        case "r":
            return `<img src="../assets/img/${color}rook.png">`;
        case "n":
            return `<img src="../assets/img/${color}knight.png">`;
        case "b":
            return `<img src="../assets/img/${color}bishop.png">`;
        case "q":
            return `<img src="../assets/img/${color}queen.png">`;
        case "k":
            return `<img src="../assets/img/${color}king.png">`;
    }
}

function pieceLetter(row, col) {
    let prefix = row < 2 ? "b-" : "w-";
    if(row === 1 || row === 6) {
        return `<img src="../assets/img/${prefix}pawn.png">`;
    }
    if(row === 7 || row === 0) {
        if(col === 0 || col === 7) {
            return `<img src="../assets/img/${prefix}rook.png">`;
        }
        if(col === 1 || col === 6) {
            return `<img src="../assets/img/${prefix}knight.png">`;
        }
        if(col === 2 || col === 5) {
            return `<img src="../assets/img/${prefix}bishop.png">`;
        }

        // these need to change for white / black
        if(col === 3) {
            return `<img src="../assets/img/${prefix}queen.png">`;
        }
        if(col === 4) {
            return `<img src="../assets/img/${prefix}king.png">`;
        }
    }
    return "";
}