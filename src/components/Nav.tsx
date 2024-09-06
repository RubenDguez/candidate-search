import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="nav">
      <Link className={`nav-item nav-link ${pathname === '/' ? 'active' : ''}`} to="/">
        Home
      </Link>
      <Link className={`nav-item nav-link ${pathname === '/SavedCandidates' ? 'active' : ''}`} to="/SavedCandidates">
        Saved Candidates
      </Link>
    </nav>
  );
};

export default Nav;
