import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import charactersData from "../../data/characters.json";

// Define the character structure
interface Character {
  name: string;
  wins: Record<string, string>;
}

// Process the character data, filtering only valid string win conditions
const characters: Character[] = charactersData.map((char) => ({
  ...char,
  wins: Object.fromEntries(
    Object.entries(char.wins).filter(([value]) => typeof value === "string")
  ),
}));

// Define the properties expected from the parent component
interface GameBoardProps {
  players: number;
  playerNames: {
    player1: string;
    player2: string;
  };
}

// Define the structure for the score
interface Score {
  player1: number;
  player2: number;
}

/**
 * GameBoard Component
 * Manages the main game logic, including player choices, determining the winner,
 * updating scores, and handling game rounds.
 */

const GameBoard: React.FC<GameBoardProps> = ({ players, playerNames }) => {
  // Load score from localStorage
  const [score, setScore] = useState<Score>(() => {
    const savedScore = localStorage.getItem("gameScore");
    return savedScore ? JSON.parse(savedScore) : { player1: 0, player2: 0 };
  });

  // Game state variables
  const [player1Choice, setPlayer1Choice] = useState<string | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningReason, setWinningReason] = useState<string | null>(null);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<"player1" | "player2">(
    "player1"
  );

  /**
   * Save score to localStorage whenever it updates
   */
  useEffect(() => {
    localStorage.setItem("gameScore", JSON.stringify(score));
  }, [score]);

  /**
   * Determines the winner based on selected characters.
   */
  const determineWinner = (player1Choice: string, player2Choice: string) => {
    if (!player1Choice || !player2Choice) return { winner: null, reason: null };

    if (player1Choice === player2Choice) {
      return { winner: "Draw", reason: null };
    }

    const playerCharacter = characters.find(
      (char) => char.name === player1Choice
    );
    if (playerCharacter && playerCharacter.wins[player2Choice]) {
      return {
        winner: playerNames.player1,
        reason: `${player1Choice} ${playerCharacter.wins[player2Choice]}`,
      };
    }

    const opponentCharacter = characters.find(
      (char) => char.name === player2Choice
    );
    if (opponentCharacter && opponentCharacter.wins[player1Choice]) {
      return {
        winner: playerNames.player2,
        reason: `${player2Choice} ${opponentCharacter.wins[player1Choice]}`,
      };
    }

    return { winner: "Unknown", reason: "No valid rule found." };
  };

  /**
   * Updates game state after both players have chosen.
   */
  useEffect(() => {
    if (player1Choice && player2Choice) {
      const result = determineWinner(player1Choice, player2Choice);
      setWinner(result.winner);
      setWinningReason(result.reason);

      setScore((prevScore) => ({
        player1:
          result.winner === playerNames.player1
            ? prevScore.player1 + 1
            : prevScore.player1,
        player2:
          result.winner === playerNames.player2
            ? prevScore.player2 + 1
            : prevScore.player2,
      }));

      setRoundFinished(true);
    }
  }, [player1Choice, player2Choice]);

  /**
   * Handles the player's character selection.
   */
  const handleChoice = (choice: string) => {
    if (roundFinished) return;

    if (players === 1) {
      // Single-player mode: randomly select a character for the computer
      const computerChoice =
        characters[Math.floor(Math.random() * characters.length)].name;
      setPlayer1Choice(choice);
      setPlayer2Choice(computerChoice);
    } else {
      // Two-player mode: alternate between players
      if (currentPlayer === "player1") {
        setPlayer1Choice(choice);
        setCurrentPlayer("player2");
      } else {
        setPlayer2Choice(choice);
      }
    }
  };

  /**
   * Resets choices and starts a new round.
   */
  const nextRound = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setWinner(null);
    setWinningReason(null);
    setRoundFinished(false);
    setCurrentPlayer("player1");
  };

  /**
   * Fully resets the game, including the score.
   */
  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setWinner(null);
    setWinningReason(null);
    setScore({ player1: 0, player2: 0 }); // Reset score in state
    setRoundFinished(false);
    setCurrentPlayer("player1");
    localStorage.removeItem("score"); // Clear stored score in localStorage
  };

  return (
    <div className="game-board">
      {/* Game Title */}
      <h2 className="game-title">
        {playerNames.player1} vs {playerNames.player2}
      </h2>

      {/* Scoreboard */}
      <div className="scoreboard">
        <p>
          Score: {playerNames.player1}: {score.player1} - {playerNames.player2}:{" "}
          {score.player2}
        </p>
      </div>

      {/* Game Play Section */}
      {!roundFinished ? (
        <div className="game-play">
          <h4 className="turn-indicator">
            {currentPlayer === "player1"
              ? playerNames.player1
              : playerNames.player2}
            's turn
          </h4>
          <div className="game-cards-wrap">
            {characters.map((character) => (
              <button
                key={character.name}
                onClick={() => handleChoice(character.name)}
                className="game-card"
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Winning Message */}
          {winner && (
            <div className="winning-message">
              {winner === "Draw" ? (
                <p className="winner">It's a tie!</p>
              ) : (
                <>
                  <p className="winner">Winner: {winner}</p>
                  <p className="winning-reason">{winningReason}</p>
                </>
              )}
            </div>
          )}
          <button onClick={nextRound}>Next Round</button>
        </div>
      )}

      {/* Reset Game Button */}
      <button onClick={resetGame} className="reset-game-button">
        restart ⟳
      </button>
    </div>
  );
};

export default GameBoard;
