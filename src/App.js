import './App.css';
import {NavInput} from "./components/01-nav/nav-input";
import {Board} from "./components/02-board/board";
import {DataInfo} from "./components/03-info/data-info";
import {useFetch} from "./util/actions/useFetch";
import {useEffect, useState} from "react";
import {renderBoard} from './util/boardRender';

let myUserName = 'armnlegs';

function App() {

    const {isLoading, error, sendReq} = useFetch();
    const [userName, setUserName] = useState(myUserName);

    const submitUserName = (uN) => {
        setUserName(uN);
    }

    useEffect(() => {
        const getGameFenStrings = (res) => {
            const data = res.games.map(game => {
                return game.fen.split(" ")[0];
            });
            console.log(data);
            return data;
        };

        sendReq(userName, getGameFenStrings);

    }, [sendReq, userName]);

    const changeGame = (amount) => {
        // +1 or -1 to change the game idx
    }


    return (
    <div className="App">
      <NavInput searchUser={submitUserName}/>
      <Board />
      <DataInfo gameIdx={1} player1={'armnlegs'} player2={'nemo'} changeGame={changeGame}/>
    </div>
    );
}

export default App;
