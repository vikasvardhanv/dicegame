import { useState } from 'react';
import { Phone } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the verification code
    setShowVerification(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify the code
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome to Dice Game</h2>
          <p className="mt-2 text-gray-400">Sign in to start playing</p>
        </div>

        {!showVerification ? (
          <form onSubmit={handleSubmitPhone} className="mt-8 space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105"
            >
              Get Verification Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-400 mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105"
            >
              Verify & Continue
            </button>
            <button
              type="button"
              onClick={() => setShowVerification(false)}
              className="w-full py-3 px-4 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;