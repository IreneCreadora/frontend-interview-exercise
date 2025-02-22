import { useEffect, useState } from "react";
import GameSelection from "../GameSelection/GameSelection";
import PlayerForm from "../PlayerForm/PlayerForm";
import GameBoard from "../GameBoard/GameBoard";

/**
 * App Component
 * This is the main component that controls the game flow.
 * It manages the number of players, player names, and game state.
 */
function App() {
  // State to track the number of players (0 = selection screen, 1 = solo, 2 = multiplayer)
  const [players, setPlayers] = useState(0);
  // State to store player names, initially empty
  const [playerNames, setPlayerNames] = useState({ player1: "", player2: "" });
  // State to track if the game has started
  const [gameStarted, setGameStarted] = useState(false);

  /**
   * Effect to clear the stored game score when a new game starts.
   * This prevents old scores from persisting across new sessions.
   */
  useEffect(() => {
    if (!gameStarted) {
      localStorage.removeItem("gameScore");
    }
  }, [gameStarted]);

  return (
    <>
      {/* Show Game Selection screen if no players are chosen */}
      {players === 0 ? (
        <GameSelection setPlayers={setPlayers} />
      ) : !gameStarted ? (
        /* Show Player Form to enter names before starting the game */
        <PlayerForm
          players={players}
          setPlayerNames={setPlayerNames}
          setGameStarted={setGameStarted}
        />
      ) : (
        /* Show Game Board when the game starts */
        <GameBoard players={players} playerNames={playerNames} />
      )}
    </>
  );
}

export default App;
