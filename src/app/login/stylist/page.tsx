'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StylistLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app, authenticate with backend
    if (email && password) {
      // Set stylist session (in real app, use proper auth)
      localStorage.setItem('userType', 'stylist');
      router.push('/stylist/dashboard');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="text-center">
          <h1 className="title">Stylist Login</h1>
          <p className="subtitle">Sign in to your stylist account</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '24px' }}>
          <p style={{ marginBottom: '8px' }}>
            New user? <Link href="/register/stylist" className="link">Create an account</Link>
          </p>
          <Link href="/" className="link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}