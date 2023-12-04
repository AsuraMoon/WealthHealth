import Logo from "../assets/images/wealthhealth.png";
import NavBar from "../components/Navbar/Navbar";
import "./Header.scss";

function Header() {
	return (
		<header className="header">
			<div className="header-logo">
				<img
					src={Logo}
					alt="Logo"
					className="header-logo-image"
					width={115}
					height={105}
				/>
				<p className="header-websitename" data-element-id="headingsMap-0">
					HRnet
				</p>
			</div>
			<NavBar></NavBar>
		</header>
	);
}

export default Header;
