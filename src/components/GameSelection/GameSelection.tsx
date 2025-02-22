import automataLogo from "../../assets/automata.png";
import charactersData from "../../data/characters.json";
import "./GameSelection.css";

interface GameSelectionProps {
  setPlayers: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * GameSelection Component
 * This component allows the user to choose between single-player and two-player modes.
 * It dynamically displays the available game characters in game title.
 */
const GameSelection: React.FC<GameSelectionProps> = ({ setPlayers }) => {
  // Extract all character names and join them as a string
  const gameTitle = charactersData.map((char) => char.name).join(", ");

  return (
    <>
      <div>
        <a
          href="https://automata.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={String(automataLogo)}
            className="logo"
            alt="Automata logo"
          />
        </a>
      </div>
      <h1>Frontend Exercise</h1>
      <h3>Performed by Iryna Makovoz</h3>

      {/* Dynamic Game Title */}
      <h2>{gameTitle}</h2>

      {/* Game Mode Selection */}
      <div className="button-container">
        <button onClick={() => setPlayers(1)}>SOLO GAME</button>
        <button onClick={() => setPlayers(2)}>PLAY TOGETHER</button>
      </div>
    </>
  );
};
export default GameSelection;
