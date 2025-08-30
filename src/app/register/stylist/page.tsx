'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerWithEmail, signInWithGoogle } from '@/lib/auth';
import { uploadProfilePicture, uploadMultipleDocuments } from '@/lib/storage';

export default function StylistRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    location: '',
    password: ''
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await registerWithEmail(formData.email, formData.password, {
        name: formData.name,
        phone: formData.phone,
        skills: formData.skills,
        experience: formData.experience,
        location: formData.location,
        role: 'stylist'
      });

      // Upload profile picture if provided
      let profilePictureUrl = '';
      if (profilePicture) {
        profilePictureUrl = await uploadProfilePicture(profilePicture, user.uid);
      }

      // Upload documents if provided
      let documentUrls: string[] = [];
      if (documents.length > 0) {
        documentUrls = await uploadMultipleDocuments(documents, user.uid);
      }

      alert('Registration successful! Your account is pending verification.');
      router.push('/login/stylist');
    } catch (error: any) {
      alert(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    
    try {
      await signInWithGoogle();
      router.push('/stylist/profile'); // Redirect to complete profile
    } catch (error) {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card card-large">
        <div className="text-center">
          <h1 className="title">Stylist Registration</h1>
          <p className="subtitle">Create your professional stylist account</p>
        </div>

        <button 
          onClick={handleGoogleRegister} 
          className="btn btn-outlined" 
          style={{ width: '100%', marginBottom: '24px' }}
          disabled={loading}
        >
          🔍 Continue with Google
        </button>

        <div style={{ margin: '16px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
          or register with email
        </div>

        <form onSubmit={handleSubmit} className="form">
          {/* Profile Picture Section */}
          <div className="form-group">
            <label className="label">Profile Picture</label>
            <div className="text-center">
              {profilePreview ? (
                <img src={profilePreview} alt="Profile" className="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  👤
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
                id="profile-picture"
              />
              <label htmlFor="profile-picture" className="btn btn-outlined">
                Choose Profile Picture
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input"
                placeholder="City, State"
                required
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-group">
            <label className="label">Skills & Specializations *</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="textarea"
              placeholder="e.g., Hair cutting, coloring, styling, makeup, nail art..."
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Years of Experience *</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="input"
              placeholder="e.g., 5 years"
              required
            />
          </div>

          {/* Documents Upload */}
          <div className="form-group">
            <label className="label">Certificates & Documents</label>
            <div className="upload-area" onClick={() => document.getElementById('documents')?.click()}>
              <div className="upload-icon">📄</div>
              <div className="upload-text">Upload your certificates, licenses, or portfolio</div>
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

          {/* Password */}
          <div className="form-group">
            <label className="label">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '24px' }}>
          <p>Already have an account? <Link href="/login/stylist" className="link">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}