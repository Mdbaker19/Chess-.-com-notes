export function getPiece(pieceInput) {
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
        default:
            throw new Error('Piece type not found');
    }
}

export function pieceLetter(row, col) {
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