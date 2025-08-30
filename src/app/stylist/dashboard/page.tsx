'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StylistDashboard() {
  const [stylistData, setStylistData] = useState({
    name: 'John Doe',
    status: 'pending' as 'pending' | 'approved' | 'rejected',
    profileCompleteness: 70
  });
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'stylist') {
      router.push('/unauthorized');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    router.push('/');
  };

  const getStatusMessage = () => {
    switch (stylistData.status) {
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
          <span className={`status-${stylistData.status}`}>
            {stylistData.status.charAt(0).toUpperCase() + stylistData.status.slice(1)}
          </span>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            {getStatusMessage()}
          </p>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stylistData.profileCompleteness}%</div>
          <div className="stat-label">Profile Completed</div>
          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px', marginTop: '0.5rem' }}>
            <div 
              style={{ 
                width: `${stylistData.profileCompleteness}%`, 
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
          {stylistData.profileCompleteness < 100 && (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Complete your profile to increase your chances of approval.
            </p>
          )}
        </div>
      </div>

      {stylistData.status === 'rejected' && (
        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <h3 style={{ color: '#dc2626', marginBottom: '0.5rem' }}>Account Rejected</h3>
          <p>Your account application was not approved. Please review your information and contact support if you believe this was an error.</p>
        </div>
      )}
    </div>
  );
}