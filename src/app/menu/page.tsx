"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Menu = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-8">Menu</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push('/step1')}
          className="w-64 bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-colors"
        >
          Step 1
        </button>
        <button
          onClick={() => router.push('/step2')}
          className="w-64 bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-colors"
        >
          Step 2
        </button>
        <button
          onClick={() => router.push('/step3')}
          className="w-64 bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-colors"
        >
          Step 3
        </button>
        <button
          onClick={handleLogout}
          className="w-64 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;