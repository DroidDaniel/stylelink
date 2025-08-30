'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AdminStylists() {
  const [stylists, setStylists] = useState<Stylist[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'pending', skills: 'Hair cutting, coloring', experience: '5 years', location: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', status: 'approved', skills: 'Styling, makeup', experience: '3 years', location: 'Los Angeles' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-123-4567', status: 'rejected', skills: 'Hair cutting', experience: '2 years', location: 'Chicago' }
  ]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
      router.push('/unauthorized');
    }
  }, [router]);

  const filteredStylists = filter === 'all' 
    ? stylists 
    : stylists.filter(stylist => stylist.status === filter);

  const updateStatus = (id: number, status: 'approved' | 'rejected') => {
    setStylists(stylists.map(stylist => 
      stylist.id === id ? { ...stylist, status } : stylist
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="dashboard-title">Manage Stylists</h1>
          <Link href="/admin/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="card card-large">
        <div style={{ marginBottom: '24px' }}>
          <label className="label">Filter by status</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
            className="input"
            style={{ width: '200px' }}
          >
            <option value="all">All Stylists</option>
            <option value="pending">Pending Verification</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Stylist</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStylists.map(stylist => (
                <tr key={stylist.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src="/api/placeholder/40/40" 
                        alt={stylist.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: '500' }}>{stylist.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {stylist.experience} experience
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{stylist.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {stylist.phone}
                    </div>
                  </td>
                  <td>{stylist.location}</td>
                  <td>
                    <span className={`status-${stylist.status}`}>
                      {stylist.status.charAt(0).toUpperCase() + stylist.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Link 
                        href={`/admin/stylist/${stylist.id}`} 
                        className="btn btn-outlined" 
                        style={{ padding: '4px 12px', fontSize: '0.75rem', minWidth: 'auto' }}
                      >
                        View
                      </Link>
                      {stylist.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus(stylist.id, 'approved')}
                            className="btn btn-primary"
                            style={{ padding: '4px 12px', fontSize: '0.75rem', minWidth: 'auto' }}
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateStatus(stylist.id, 'rejected')}
                            className="btn"
                            style={{ 
                              padding: '4px 12px', 
                              fontSize: '0.75rem', 
                              minWidth: 'auto',
                              backgroundColor: 'var(--error)', 
                              color: 'white' 
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}