import automataLogo from "../../assets/automata.png";
import "./GameSelection.css";

interface GameSelectionProps {
  setPlayers: React.Dispatch<React.SetStateAction<number>>;
}

const GameSelection: React.FC<GameSelectionProps> = ({ setPlayers }) => (
  <>
    <div>
      <a
        href="https://automata.tech/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={String(automataLogo)} className="logo" alt="Automata logo" />
      </a>
    </div>
    <h1>Frontend Exercise</h1>
    <h3>Performed by Iryna Makovoz</h3>
    <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
    <div className="button-container">
      <button onClick={() => setPlayers(1)}>SOLO GAME</button>
      <button onClick={() => setPlayers(2)}>PLAY TOGETHER</button>
    </div>
  </>
);

export default GameSelection;
