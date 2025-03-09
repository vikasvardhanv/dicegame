import { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import DiceGame from './components/DiceGame';
import Wallet from './components/Wallet';
import Login from './components/Login';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <header className="mb-8">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dice Game</h1>
            <Wallet />
          </div>
        </header>
        <main className="container mx-auto">
          <DiceGame isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;