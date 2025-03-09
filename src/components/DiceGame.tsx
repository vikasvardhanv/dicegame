import { useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

interface DiceGameProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const DiceGame = ({ isPlaying, setIsPlaying }: DiceGameProps) => {
  const { placeBet, addWinnings } = useContext(WalletContext);
  const [betAmount, setBetAmount] = useState(1);
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [firstWinNumber, setFirstWinNumber] = useState<number | null>(null);
  const [gameStage, setGameStage] = useState<'first' | 'second'>('first');
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<
    Array<{ number: number; won: boolean }>
  >([]);

  const rollDice = () => {
    if (!selectedNumber) {
      setMessage('Please select a number first!');
      return;
    }

    if (!placeBet(betAmount)) {
      setMessage('Insufficient funds!');
      return;
    }

    setIsRolling(true);
    setIsPlaying(true);
    setMessage('');

    // Simulate dice roll
    setTimeout(() => {
      const newDiceNumber = Math.floor(Math.random() * 9) + 1;
      setDiceNumber(newDiceNumber);
      setIsRolling(false);

      if (newDiceNumber === selectedNumber) {
        if (gameStage === 'first') {
          const winnings = betAmount * 8;
          addWinnings(winnings);
          setFirstWinNumber(selectedNumber);
          setGameStage('second');
          setMessage(
            `You won $${winnings}! Now try for 80x in the second round!`
          );
        } else {
          const winnings = betAmount * 80;
          addWinnings(winnings);
          setMessage(
            `Congratulations! You won $${winnings} in the second round!`
          );
          // Reset game after second win
          setGameStage('first');
          setFirstWinNumber(null);
        }
      } else {
        if (gameStage === 'second') {
          setMessage('Second round lost! Starting over...');
          setGameStage('first');
          setFirstWinNumber(null);
        } else {
          setMessage('Better luck next time!');
        }
      }

      setHistory((prev) =>
        [
          ...prev,
          { number: newDiceNumber, won: newDiceNumber === selectedNumber },
        ].slice(-5)
      );
      setSelectedNumber(null);
    }, 1000);
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {gameStage === 'first'
            ? 'First Round'
            : 'Second Round - 80x Multiplier!'}
        </h2>
        <p className="text-gray-300 text-lg">
          {gameStage === 'first'
            ? 'Select a number and win 8x your bet!'
            : `You won with ${firstWinNumber}! Win again for 80x your bet!`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNumber(num)}
                disabled={isRolling}
                className={`p-8 text-4xl font-bold rounded-lg transition transform hover:scale-105
                  ${
                    selectedNumber === num
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }
                  ${isRolling ? 'cursor-not-allowed opacity-50' : ''}
                  ${firstWinNumber === num ? 'ring-2 ring-green-400' : ''}`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <label className="block text-gray-300 mb-2 text-lg">
              Bet Amount ($)
            </label>
            <input
              type="number"
              min="1"
              value={betAmount}
              onChange={(e) =>
                setBetAmount(Math.max(1, parseInt(e.target.value) || 0))
              }
              className="w-full px-4 py-3 bg-gray-600 rounded-lg text-white text-xl"
              disabled={isRolling}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <div className="text-center">
            <div
              className={`w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl 
              flex items-center justify-center text-8xl font-bold mb-6 shadow-lg
              ${isRolling ? 'animate-dice-roll' : ''}`}
            >
              {diceNumber || '?'}
            </div>

            <button
              onClick={rollDice}
              disabled={isRolling || !selectedNumber}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg 
                text-xl font-bold hover:from-green-600 hover:to-emerald-700 transition
                transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100 shadow-lg"
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
          </div>

          <div className="w-full mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">
              Recent Rolls
            </h3>
            <div className="flex gap-2 justify-center">
              {history.map((roll, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold
                    ${roll.won ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {roll.number}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`mt-6 text-center text-xl font-bold p-4 rounded-lg
          ${
            message.includes('won')
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default DiceGame;
