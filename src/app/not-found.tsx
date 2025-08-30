import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="card text-center">
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '1rem' }}>
          404
        </h1>
        <h2 className="title">Page Not Found</h2>
        <p className="subtitle">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}