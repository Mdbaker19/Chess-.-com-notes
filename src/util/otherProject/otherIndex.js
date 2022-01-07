(() => {
    const board = $("#board");
    let cache = [];
    let gameData = [];
    let idx = 0;
    let notActive = true;

    let whoAndWho = document.getElementById("whoAndWho");
    let next = document.getElementById("next");
    let prev = document.getElementById("prev");
    let gameIdx = document.getElementById("gameIdx");
    let userNameInput = document.getElementById("username");
    document.getElementById("submit").addEventListener("click", () => {
        submit();
    });

    document.getElementById("fenSaver").addEventListener("click", () => {
        console.log(readFenFromBoard(board));
    });

    document.getElementById("changeMe").addEventListener("click", () => {
        whiteColor = whiteColorInput.value;
        blackColor = blackColorInput.value;
        getPositionFromFen(board, currentFen, createBoard, squareEvent);
    });

    window.addEventListener("keydown", e => {
        if(e.key === "Enter") {
            submit();
        }
    });

    function submit() {
        let input = userNameInput.value;
        if(input.trim().length > 0) {
            // need to validate the response, valid username with chess.com and valid games
            // TODO: this is causing event bubbling...... need to clean up the logic
            init(input).then(buttons);
        } else {
            console.log("enter a user name");
        }
    }

    // TODO: SOME IDX RESETTING OUTSIDE THIS AND USE THIS BOOL TO PREVENT BUBBLING...for now..
    function buttons() {
        if(notActive) {
            let res = getPositionFromFen(board, cache[idx], createBoard, squareEvent);
            if(res === -1) {
                document.getElementById("loading").innerText = "not found";
                return;
            }
            document.getElementById("loading").style.display = "none";
            next.addEventListener("click", () => {
                idx++;
                idx %= cache.length;
                getPositionFromFen(board, cache[idx], createBoard, squareEvent);
                gameIdx.innerText = (idx + 1).toString();
                whoAndWho.innerText = gameData[idx];
            });
            prev.addEventListener("click", () => {
                idx--;
                idx = idx < 0 ? cache.length - 1 : idx;
                getPositionFromFen(board, cache[idx], createBoard, squareEvent);
                gameIdx.innerText = (idx + 1).toString();
                whoAndWho.innerText = gameData[idx];
            });
            gameIdx.innerText = (idx + 1).toString();
            whoAndWho.innerText = gameData[idx];
        }
        notActive = false; // fix?
        console.log("Ready");
    }

    function createBoard(){
        board.html("");
        for(let rows = 0; rows < 8; rows++) {
            for(let cols = 0; cols < 8; cols++) {
                board.append(square(rows, cols));
            }
        }
    }

    // getPositionFromFen(board, currentFen, createBoard);
    getPositionFromFen(board, pieceTestFen, createBoard, squareEvent);

    function url(name) {
        return `https://api.chess.com/pub/player/${name}/games`;
    }

    async function init(name) {
        cache = [];
        gameData = [];
        const games = await getData(name);
        games.forEach(game => {
            cache.push(formatFen(game.fen));
            gameData.push(getPlayerNames(game.white.split("/"), game.black.split("/")));
        });
        return cache;
    }

    function formatFen(fen) {
        return fen.split(" ")[0];
    }

    // get the colors to for each
    function getPlayerNames(nameString1, nameString2) {
        let one = nameString1[nameString1.length - 1];
        let two = nameString2[nameString2.length - 1];
        return `${one} as W and ${two} as B`;
    }

    function getData(name) {
        return fetch(url(name)).then(res => res.json().then(data => {
            return data.games
        }));
    }




    // MOVE STUFF
    let whosTurn = 'b';
    function squareEvent() {
        Array.from(document.getElementsByClassName("square")).forEach(s => {
            s.addEventListener("click", (e) => {

                // when a piece is clicked one after another
                resetBoardClasses(board);

                // will need to make this work when a piece is clicked, move to this square
                if(e.path.length < 8) return; // blank square, error for now

                let pathObj = e.path[0];
                let [row, col] = actualPosition(e.path[1].dataset.position.split("-"));
                let node = pathObj.tagName;
                if(node !== "IMG") return;
                let [color, pieceType] = pathObj.outerHTML.split(" ")[3].split("/")[1].split(".")[0].split("-");
                if(color !== whosTurn) return;
                showMovesOnBoard(board, [row, col], generateMoves(board, pieceType, row, col));
            });
        });
    }

})();

/*
* I want to store the data like this and read
* {
*   user: 'name',
*   game: 'name as w / name2 as b',
*   data: {
*       [
*           thought: 1,
*           fen: 'rr/8/4k/...',
*           note: 'i was planning this',
*           movePath: ['rxb4', 'nb8', ''..]
*       ],
*       [
*           thought: 2,
*           fen: 'n7/pp3/..',
*           note: 'plan this if that',
*           movePath: [...]
*       ]
*   }
* }
* */