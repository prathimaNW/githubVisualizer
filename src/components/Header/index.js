import {Link, useLocation} from 'react-router-dom'
import './index.css'

const Header = () => {
  const location = useLocation()

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <h1 className="h1">Github Profile Visualizer</h1>
        <ul className="nav-menu">
          <li>
            <Link
              to="/"
              className={`link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/repositories"
              className={`link ${
                location.pathname === '/repositories' ? 'active' : ''
              }`}
            >
              Repositories
            </Link>
          </li>
          <li>
            <Link
              to="/analysis"
              className={`link ${
                location.pathname === '/analysis' ? 'active' : ''
              }`}
            >
              Analysis
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
