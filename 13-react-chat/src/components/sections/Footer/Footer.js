import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">Strona glowna</Link>
          </li>
          <li>
            <Link to="/about">O mnie</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;