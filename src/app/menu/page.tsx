"use client";

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Menu = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-8">Menu</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push('/step1')}
          className="w-64 bg-green-500 text-white p-2 rounded"
        >
          Step 1
        </button>
        <button
          onClick={() => router.push('/step2')}
          className="w-64 bg-blue-500 text-white p-2 rounded"
        >
          Step 2
        </button>
        <button
          onClick={() => router.push('/step3')}
          className="w-64 bg-red-500 text-white p-2 rounded"
        >
          Step 3
        </button>
      </div>
    </div>
  );
};

export default Menu;