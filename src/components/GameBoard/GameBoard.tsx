import characters from "../../data/characters.json";
interface GameBoardProps {
  players: number;
  playerNames: {
    player1: string;
    player2: string;
  };
}
const GameBoard: React.FC<GameBoardProps> = ({ players, playerNames }) => (
  <div>
    <h3>
      Player{players === 2 ? "s" : ""}: {playerNames.player1} vs{" "}
      {playerNames.player2}
    </h3>
    <div>
      {characters.map((character) => (
        <button key={character.name}>{character.name}</button>
      ))}
    </div>
  </div>
);

export default GameBoard;
