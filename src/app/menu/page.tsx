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
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 space-y-4">
      <h1 className="text-3xl font-bold mb-8">Menu</h1>
      <div className="flex flex-col space-y-4">
        <button onClick={() => router.push('/step1')} className="w-64 bg-orange-600 text-white p-4 rounded shadow-lg hover:bg-orange-700">Step 1</button>
        <button onClick={() => router.push('/step2')} className="w-64 bg-orange-600 text-white p-4 rounded shadow-lg hover:bg-orange-700">Step 2</button>
        <button onClick={() => router.push('/step3')} className="w-64 bg-orange-600 text-white p-4 rounded shadow-lg hover:bg-orange-700">Step 3</button>
        <button onClick={() => { localStorage.removeItem('isAuthenticated'); router.push('/login'); }} className="w-64 bg-red-600 text-white p-4 rounded shadow-lg hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
};

export default Menu;