'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = {
    totalStylists: 12,
    pendingVerifications: 3,
    approvedStylists: 8,
    rejectedStylists: 1
  };
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
      router.push('/unauthorized');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    router.push('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalStylists}</div>
          <div className="stat-label">Total Stylists</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.pendingVerifications}</div>
          <div className="stat-label">Pending Verifications</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.approvedStylists}</div>
          <div className="stat-label">Approved Stylists</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.rejectedStylists}</div>
          <div className="stat-label">Rejected Stylists</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Quick Actions</h2>
        <div className="button-group">
          <Link href="/admin/stylists" className="btn btn-primary">
            Manage Stylists
          </Link>
        </div>
      </div>
    </div>
  );
}