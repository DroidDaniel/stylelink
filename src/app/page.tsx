import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <div className="text-center">
          <h1 className="title">
            Welcome to StyleLink
          </h1>
          <p className="subtitle">
            Connect Stylists
          </p>
        </div>
        
        <div className="button-group">
          <Link href="/login/admin" className="btn btn-primary">
            Login as Admin
          </Link>
          
          <Link href="/login/stylist" className="btn btn-secondary">
            Login as Stylist
          </Link>
        </div>
      </div>
    </div>
  );
}
