export const DataInfo = (props) => {

    const nextHandler = () => {
        // probably make this a dispatched action with the prev
        // {action: 'gameChange', amount: 1};
        props.changeGame(1);
    }

    const prevHandler = () => {
        // {action: 'gameChange', amount: -1};
        props.changeGame(-1);
    }

    return (
        <>
            <h1>Game {props.gameIdx} between {props.player1} and {props.player2}</h1>
            <button onClick={nextHandler}>Next</button>
            <button onClick={prevHandler}>Prev</button>
        </>
    );
}