import { createContext, useState, ReactNode } from 'react';

interface WalletContextType {
  balance: number;
  addFunds: (amount: number) => void;
  placeBet: (amount: number) => boolean;
  addWinnings: (amount: number) => void;
}

export const WalletContext = createContext<WalletContextType>({
  balance: 0,
  addFunds: () => {},
  placeBet: () => false,
  addWinnings: () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);

  const addFunds = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const placeBet = (amount: number) => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const addWinnings = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  return (
    <WalletContext.Provider
      value={{ balance, addFunds, placeBet, addWinnings }}
    >
      {children}
    </WalletContext.Provider>
  );
};
