import Logo from "../assets/images/wealthhealth.jpg";
import "./Header.scss";

function Header() {
	return (
		<header className="header">
			<div className="main-nav-logo">
				<img
					src={Logo}
					alt="Logo"
					className="main-nav-logo-image"
					width={100}
					height={92}
				/>
				<p className="websitename" data-element-id="headingsMap-0">
					HRnet
				</p>
			</div>
		</header>
	);
}

export default Header;