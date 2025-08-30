import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="container">
      <div className="card text-center">
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
          401
        </h1>
        <h2 className="title">Unauthorized Access</h2>
        <p className="subtitle">
          You need to be logged in to access this page.
        </p>
        <div className="button-group">
          <Link href="/login/admin" className="btn btn-primary">
            Admin Login
          </Link>
          <Link href="/login/stylist" className="btn btn-secondary">
            Stylist Login
          </Link>
          <Link href="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}