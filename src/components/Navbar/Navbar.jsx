import { NavLink } from "react-router-dom";
import './Navbar.scss';

function NavBar() {
	return (
		<section className="navbar">
				<NavLink to="/" className={({ isActive }) => isActive ? "router-link-exact-active" : ""}>
          Home
        </NavLink>
				<NavLink to="/employee-list" className={({ isActive }) => isActive ? "router-link-exact-active" : ""}>
          View Employees
				</NavLink>
		</section>
	);
}

export default NavBar;
