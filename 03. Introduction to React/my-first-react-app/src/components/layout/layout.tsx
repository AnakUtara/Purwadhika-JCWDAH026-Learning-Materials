import { Outlet } from "react-router";
import Navbar from "../navbar";

const Layout = () => {
	const navData = [
		{ id: 1, label: "Home", link: "/" },
		{ id: 2, label: "About", link: "/about" },
		{ id: 3, label: "Hero", link: "#hero" },
		{ id: 4, label: "Services", link: "#services" },
	];

	return (
		<>
			<Navbar data={navData} />
			<Outlet />
		</>
	);
};

export default Layout;
