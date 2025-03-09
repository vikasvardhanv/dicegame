import { useContext, useState } from 'react';
import { WalletContext } from '../context/WalletContext';
import { QRCodeSVG } from 'qrcode.react';
import { Bitcoin, CreditCard, Wallet2 } from 'lucide-react';

const PAYMENT_METHODS = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: Bitcoin,
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  },
  {
    id: 'card',
    name: 'Credit Card',
    icon: CreditCard,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: Wallet2,
  },
];

const Wallet = () => {
  const { balance, addFunds } = useContext(WalletContext);
  const [amount, setAmount] = useState('');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleAddFunds = () => {
    const fundAmount = parseFloat(amount);
    if (!isNaN(fundAmount) && fundAmount > 0) {
      addFunds(fundAmount);
      setAmount('');
      setShowAddFunds(false);
      setSelectedMethod(null);
    }
  };

  const renderPaymentMethod = () => {
    const method = PAYMENT_METHODS.find(m => m.id === selectedMethod);
    if (!method) return null;

    switch (method.id) {
      case 'bitcoin':
        return (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Send Bitcoin to this address</h3>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <QRCodeSVG value={method.address} size={200} />
            </div>
            <p className="text-sm text-gray-400 break-all">{method.address}</p>
          </div>
        );
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Card Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        );
      case 'bank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Account Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your account number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Routing Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter routing number"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="text-lg">Balance: ${balance.toFixed(2)}</span>
        <button
          onClick={() => setShowAddFunds(!showAddFunds)}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition"
        >
          Add Funds
        </button>
      </div>

      {showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Funds</h2>
              <button
                onClick={() => {
                  setShowAddFunds(false);
                  setSelectedMethod(null);
                }}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {!selectedMethod ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                    >
                      <method.icon className="w-6 h-6" />
                      <span className="font-medium">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {renderPaymentMethod()}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="flex-1 py-3 px-4 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAddFunds}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;