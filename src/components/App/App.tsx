import { useState } from "react";
import GameSelection from "../GameSelection/GameSelection";
import PlayerForm from "../PlayerForm/PlayerForm";
import GameBoard from "../GameBoard/GameBoard";

function App() {
  const [players, setPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState({ player1: "", player2: "" });
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      {players === 0 ? (
        <GameSelection setPlayers={setPlayers} />
      ) : !gameStarted ? (
        <PlayerForm
          players={players}
          setPlayerNames={setPlayerNames}
          setGameStarted={setGameStarted}
        />
      ) : (
        <GameBoard players={players} playerNames={playerNames} />
      )}
    </>
  );
}

export default App;
