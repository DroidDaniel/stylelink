'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Stylist {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  skills: string;
  experience: string;
  location: string;
}

export default function StylistDetail() {
  const [stylist, setStylist] = useState<Stylist | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
      router.push('/unauthorized');
      return;
    }

    // Mock data - in real app, fetch from API
    const mockStylists: Stylist[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'pending', skills: 'Hair cutting, coloring, styling', experience: '5 years', location: 'New York' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', status: 'approved', skills: 'Styling, makeup, hair treatments', experience: '3 years', location: 'Los Angeles' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-123-4567', status: 'rejected', skills: 'Hair cutting', experience: '2 years', location: 'Chicago' }
    ];

    const foundStylist = mockStylists.find(s => s.id === parseInt(params.id as string));
    setStylist(foundStylist || null);
  }, [router, params.id]);

  const updateStatus = (status: 'approved' | 'rejected') => {
    if (stylist) {
      setStylist({ ...stylist, status });
      alert(`Stylist ${status} successfully!`);
    }
  };

  if (!stylist) {
    return (
      <div className="container">
        <div className="card">
          <h1>Stylist not found</h1>
          <Link href="/admin/stylists" className="btn btn-secondary">
            Back to Stylists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="dashboard-title">Stylist Profile</h1>
          <Link href="/admin/stylists" className="btn btn-secondary">
            Back to Stylists
          </Link>
        </div>
      </div>

      <div className="card card-large">
        {/* Profile Picture and Status */}
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <img 
            src="/api/placeholder/120/120" 
            alt={`${stylist.name} profile`} 
            className="avatar" 
          />
          <h2 className="h6">{stylist.name}</h2>
          <span className={`status-${stylist.status}`}>
            {stylist.status.charAt(0).toUpperCase() + stylist.status.slice(1)}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h3 className="h6">Personal Information</h3>
            
            <div className="form-group">
              <label className="label">Full Name</label>
              <div style={{ 
                padding: '16.5px 14px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px' 
              }}>
                {stylist.name}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Email Address</label>
              <div style={{ 
                padding: '16.5px 14px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px' 
              }}>
                {stylist.email}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Phone Number</label>
              <div style={{ 
                padding: '16.5px 14px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px' 
              }}>
                {stylist.phone}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Location</label>
              <div style={{ 
                padding: '16.5px 14px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px' 
              }}>
                {stylist.location}
              </div>
            </div>
          </div>

          <div>
            <h3 className="h6">Professional Information</h3>
            
            <div className="form-group">
              <label className="label">Skills & Specializations</label>
              <div style={{ 
                padding: '16.5px 14px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px',
                minHeight: '100px' 
              }}>
                {stylist.skills}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Years of Experience</label>
              <div style={{ 
                padding: '16.5px 14px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px' 
              }}>
                {stylist.experience}
              </div>
            </div>

            {/* Documents Section */}
            <div className="form-group">
              <label className="label">Uploaded Documents</label>
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--divider)', 
                borderRadius: '4px' 
              }}>
                <div className="file-preview">
                  <div className="file-info">
                    <div className="file-name">Certificate_Cosmetology.pdf</div>
                    <div className="file-size">2.4 MB</div>
                  </div>
                  <button className="btn btn-outlined" style={{ padding: '4px 8px', minWidth: 'auto' }}>
                    View
                  </button>
                </div>
                <div className="file-preview">
                  <div className="file-info">
                    <div className="file-name">Portfolio_Images.zip</div>
                    <div className="file-size">15.7 MB</div>
                  </div>
                  <button className="btn btn-outlined" style={{ padding: '4px 8px', minWidth: 'auto' }}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {stylist.status === 'pending' && (
          <div style={{ 
            marginTop: '32px', 
            padding: '24px', 
            backgroundColor: 'var(--background)', 
            borderRadius: '4px',
            border: '1px solid var(--divider)'
          }}>
            <h3 className="h6">Verification Actions</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Review the stylist&apos;s information and documents before making a decision.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={() => updateStatus('approved')}
                className="btn btn-primary"
              >
                Approve Stylist
              </button>
              <button 
                onClick={() => updateStatus('rejected')}
                className="btn"
                style={{ backgroundColor: 'var(--error)', color: 'white' }}
              >
                Reject Stylist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}