'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth';

export default function StylistLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmail(email, password);
      router.push('/stylist/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      await signInWithGoogle();
      router.push('/stylist/dashboard');
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="text-center">
          <h1 className="title">Stylist Login</h1>
          <p className="subtitle">Sign in to your stylist account</p>
        </div>

        <form onSubmit={handleEmailLogin} className="form">
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

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ margin: '16px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
          or
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="btn btn-outlined" 
          style={{ width: '100%' }}
          disabled={loading}
        >
          🔍 Continue with Google
        </button>

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