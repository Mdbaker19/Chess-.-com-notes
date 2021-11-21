import './App.css';
import {NavInput} from "./components/01-nav/nav-input";
import {Board} from "./components/02-board/board";
import {DataInfo} from "./components/03-info/data-info";

function App() {
  return (
    <div className="App">
      <NavInput />
      <Board />
      <DataInfo />
    </div>
  );
}

export default App;
