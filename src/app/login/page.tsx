"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'intan' && password === 'intan') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/menu');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;