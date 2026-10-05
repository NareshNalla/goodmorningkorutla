import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div className="wrap"><div className="loading">Loading…</div></div>;

  if (user) {
    return (
      <div className="wrap">
        <div className="admin-box">
          <h1>Signed in</h1>
          <p>You are signed in as <strong>{user.email}</strong>.</p>
          <div className="row-between">
            <button className="btn" onClick={() => navigate("/admin/dashboard")}>
              Go to dashboard
            </button>
            <button className="btn ghost" onClick={() => signOut(auth)}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Sign-in failed. Check your email and password.");
    }
    setBusy(false);
  };

  return (
    <div className="wrap">
      <div className="admin-box">
        <h1>Admin sign-in</h1>
        <p>Sign in to publish the daily morning &amp; evening updates.</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={login}>
          <div className="field">
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          <button className="btn" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p style={{ fontSize: ".88rem", color: "#6b7280", marginTop: 16 }}>
          First time? Create the admin user in the{" "}
          <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">
            Firebase console
          </a>{" "}
          (Authentication → Add user), then sign in here. <Link to="/">Back home</Link>
        </p>
      </div>
    </div>
  );
}
