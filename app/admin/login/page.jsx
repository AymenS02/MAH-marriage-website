'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin'); // Go to the admin page
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-2xl mb-6">🔒 Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded text-black border border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 border border-black p-2 rounded">Login</button>
      </form>
      {error && <p className="text-red-400 mt-3">{error}</p>}
    </div>
  );
}
