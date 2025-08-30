'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StylistProfile() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    skills: 'Hair cutting, coloring',
    experience: '5 years',
    location: 'New York',
    portfolio: '',
    certificates: ''
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [profilePreview, setProfilePreview] = useState<string>('/api/placeholder/120/120');
  const [isEditable, setIsEditable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'stylist') {
      router.push('/unauthorized');
      return;
    }

    // In real app, fetch stylist data and check if approved
    if (profile?.status === 'approved') {
      setIsEditable(false);
    }
  }, [router, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditable) {
      alert('Profile cannot be edited after approval.');
      return;
    }
    // In real app, save to backend
    console.log('Updated profile:', formData);
    console.log('Profile picture:', profilePicture);
    console.log('Documents:', documents);
    alert('Profile updated successfully!');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="dashboard-title">My Profile</h1>
          <Link href="/stylist/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="card card-large">
        {!isEditable && (
          <div style={{ 
            marginBottom: '24px', 
            padding: '16px', 
            backgroundColor: '#fff4e5', 
            border: '1px solid #ffb74d', 
            borderRadius: '4px',
            borderLeft: '4px solid #ff9800'
          }}>
            <p style={{ color: '#e65100', margin: 0 }}>
              Your profile has been approved and can no longer be edited. Contact support if you need to make changes.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          {/* Profile Picture Section */}
          <div className="form-group">
            <label className="label">Profile Picture</label>
            <div className="text-center">
              <img src={profilePreview} alt="Profile" className="avatar" />
              {isEditable && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                    id="profile-picture"
                  />
                  <label htmlFor="profile-picture" className="btn btn-outlined">
                    Change Picture
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 className="h6">Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  disabled={!isEditable}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  disabled={!isEditable}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  disabled={!isEditable}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input"
                  disabled={!isEditable}
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h2 className="h6">Professional Information</h2>
            <div className="form-group">
              <label className="label">Skills & Specializations</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="textarea"
                disabled={!isEditable}
                placeholder="e.g., Hair cutting, coloring, styling, makeup, nail art..."
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Years of Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input"
                disabled={!isEditable}
                placeholder="e.g., 5 years"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Portfolio Description</label>
              <textarea
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="textarea"
                disabled={!isEditable}
                placeholder="Describe your work, achievements, or provide links to your portfolio..."
              />
            </div>

            <div className="form-group">
              <label className="label">Additional Notes</label>
              <textarea
                name="certificates"
                value={formData.certificates}
                onChange={handleChange}
                className="textarea"
                disabled={!isEditable}
                placeholder="List your certifications, training, or qualifications..."
              />
            </div>
          </div>

          {/* Documents Upload */}
          {isEditable && (
            <div className="form-group">
              <label className="label">Certificates & Documents</label>
              <div className="upload-area" onClick={() => document.getElementById('documents')?.click()}>
                <div className="upload-icon">📄</div>
                <div className="upload-text">Upload certificates, licenses, or portfolio images</div>
                <div className="upload-subtext">Drag and drop files here or click to browse</div>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleDocumentChange}
                style={{ display: 'none' }}
                id="documents"
              />
              
              {documents.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  {documents.map((file, index) => (
                    <div key={index} className="file-preview">
                      <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">{formatFileSize(file.size)}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="btn btn-outlined"
                        style={{ padding: '4px 8px', minWidth: 'auto' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isEditable && (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
              <Link href="/stylist/dashboard" className="btn btn-outlined">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}