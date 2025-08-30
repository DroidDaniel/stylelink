'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth';
import { ADMIN_CREDENTIALS } from '@/lib/constants';

export default function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_CREDENTIALS.email);
  const [password, setPassword] = useState(ADMIN_CREDENTIALS.password);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = await signInWithEmail(email, password);
      if (email === ADMIN_CREDENTIALS.email) {
        router.push('/admin/dashboard');
      } else {
        alert('Admin access required');
      }
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      const user = await signInWithGoogle();
      if (user.email === ADMIN_CREDENTIALS.email) {
        router.push('/admin/dashboard');
      } else {
        alert('Admin access required');
      }
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
          <h1 className="title">Admin Login</h1>
          <p className="subtitle">Sign in to your admin account</p>
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
          <Link href="/" className="link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}