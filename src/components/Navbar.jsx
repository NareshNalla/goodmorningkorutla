import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">
          Good Morning Korutla
          <small>గుడ్ మార్నింగ్ కోరుట్ల</small>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/program">Program</NavLink>
          <NavLink to="/mla">Our MLA</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </header>
  );
}
