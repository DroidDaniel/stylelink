'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/lib/auth';

export default function StylistDashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'stylist')) {
      router.push('/unauthorized');
    }
  }, [user, profile, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return null;

  const profileCompleteness = profile.name && profile.phone && profile.skills ? 100 : 70;

  const getStatusMessage = () => {
    switch (profile.status || 'pending') {
      case 'pending':
        return 'Your account is pending verification by admin.';
      case 'approved':
        return 'Your account has been approved! You can now receive bookings.';
      case 'rejected':
        return 'Your account was rejected. Please contact support for more information.';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="dashboard-title">Stylist Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Verification Status</div>
          <span className={`status-${profile.status || 'pending'}`}>
            {(profile.status || 'pending').charAt(0).toUpperCase() + (profile.status || 'pending').slice(1)}
          </span>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            {getStatusMessage()}
          </p>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{profileCompleteness}%</div>
          <div className="stat-label">Profile Completed</div>
          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px', marginTop: '0.5rem' }}>
            <div 
              style={{ 
                width: `${profileCompleteness}%`, 
                backgroundColor: '#2563eb', 
                height: '100%', 
                borderRadius: '4px' 
              }}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Quick Actions</h2>
        <div className="button-group">
          <Link href="/stylist/profile" className="btn btn-primary">
            Update Profile
          </Link>
          {profileCompleteness < 100 && (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Complete your profile to increase your chances of approval.
            </p>
          )}
        </div>
      </div>

      {profile.status === 'rejected' && (
        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <h3 style={{ color: '#dc2626', marginBottom: '0.5rem' }}>Account Rejected</h3>
          <p>Your account application was not approved. Please review your information and contact support if you believe this was an error.</p>
        </div>
      )}
    </div>
  );
}