import "./PlayerForm.css";

interface PlayerFormProps {
  players: number;
  setPlayerNames: React.Dispatch<
    React.SetStateAction<{ player1: string; player2: string }>
  >;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * PlayerForm Component
 * This form allows players to enter their names before starting the game.
 */
const PlayerForm: React.FC<PlayerFormProps> = ({
  players,
  setPlayerNames,
  setGameStarted,
}) => {
  /**
   * Handles form submission to start the game.
   * If playing solo, automatically assigns "Computer" as player 2.
   */
  const handleStartGame = (event: React.FormEvent) => {
    event.preventDefault();
    // Set player 2 as "Computer" in solo mode
    if (players === 1) {
      setPlayerNames((prev) => ({ ...prev, player2: "Computer" }));
    }
    // Start the game
    setGameStarted(true);
  };

  return (
    <form className="player-form" onSubmit={handleStartGame}>
      {/* Dynamic title based on the number of players */}
      <h3 className="player-form-title">
        Choose Your Battle {players === 1 ? "Name" : "Names"}
      </h3>

      {/* Input for Player 1's name */}
      <input
        type="text"
        className="player-input"
        placeholder="Enter your nickname"
        required
        onChange={(e) =>
          setPlayerNames((prev) => ({ ...prev, player1: e.target.value }))
        }
      />
      {/* Input for Player 2's name (only in multiplayer mode) */}
      {players === 2 && (
        <input
          type="text"
          className="player-input"
          placeholder="Your opponent's nickname"
          required
          onChange={(e) =>
            setPlayerNames((prev) => ({ ...prev, player2: e.target.value }))
          }
        />
      )}
      {/* Button to start the game */}
      <button type="submit">START GAME</button>
    </form>
  );
};

export default PlayerForm;
