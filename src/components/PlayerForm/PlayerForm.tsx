import "./PlayerForm.css";

interface PlayerFormProps {
  players: number;
  setPlayerNames: React.Dispatch<
    React.SetStateAction<{ player1: string; player2: string }>
  >;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  players,
  setPlayerNames,
  setGameStarted,
}) => {
  const handleStartGame = (event: React.FormEvent) => {
    event.preventDefault();
    if (players === 1) {
      setPlayerNames((prev) => ({ ...prev, player2: "Computer" }));
    }
    setGameStarted(true);
  };

  return (
    <form className="player-form" onSubmit={handleStartGame}>
      <h3 className="player-form-title">
        Choose Your Battle {players === 1 ? "Name" : "Names"}
      </h3>
      <input
        type="text"
        className="player-input"
        placeholder="Enter your nickname"
        required
        onChange={(e) =>
          setPlayerNames((prev) => ({ ...prev, player1: e.target.value }))
        }
      />
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
      <button type="submit">START GAME</button>
    </form>
  );
};

export default PlayerForm;
