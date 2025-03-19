import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Add your logo to src/assets/

function Navbar() {
  return (
    <nav className="bg-beige-100 h-16 flex items-center justify-between px-4 shadow-sm">
      <Link to="/">
        <img src={logo} alt="Dishcovery Logo" className="h-10" />
      </Link>
      <button className="border-2 border-gray-800 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-beige-200">
        Sign In
      </button>
    </nav>
  );
}

export default Navbar;