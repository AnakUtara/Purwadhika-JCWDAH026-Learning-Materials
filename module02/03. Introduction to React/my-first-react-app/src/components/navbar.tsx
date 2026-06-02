import { Link } from "react-router";

type Props = {
	data: {
		id: number;
		label: string;
		link: string;
	}[];
};

const Navbar = ({ data }: Props) => {
	return (
		<nav>
			{data.map((nav) =>
				nav.link.startsWith("#") ? (
					<a key={nav.id} href={nav.link}>
						{nav.label}
					</a>
				) : (
					<Link key={nav.id} to={nav.link}>
						{nav.label}
					</Link>
				),
			)}
		</nav>
	);
};

export default Navbar;
