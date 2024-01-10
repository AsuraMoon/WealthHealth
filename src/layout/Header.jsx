import Logo from '../assets/images/wealthhealth.png';
import NavBar from '../components/Navbar/Navbar';
import './Header.scss';

// Définition du composant Header
function Header() {
  return (
    <header className="header">
      {/* Contenu du logo et du nom du site */}
      <div className="header-logo">
        {/* Image du logo */}
        <img
          src={Logo}
          alt="Logo"
          className="header-logo-image"
          width={115}
          height={105}
        />
        {/* Nom du site */}
        <p className="header-websitename" data-element-id="headingsMap-0">
          HRnet
        </p>
      </div>

      {/* Barre de navigation */}
      <NavBar />
    </header>
  );
}

// Exportation du composant Header
export default Header;
