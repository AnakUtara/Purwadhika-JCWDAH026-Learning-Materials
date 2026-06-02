import { LayoutTemplate, SquareCode, TabletSmartphone } from "lucide-react";
import type { ReactNode } from "react";

interface IService {
	id: number;
	title: string;
	description: string;
	icon: ReactNode;
}

const services: IService[] = [
	{
		id: 1,
		title: "Web Development",
		description:
			"Building responsive and modern websites using the latest technologies.",
		icon: <SquareCode size={64} />,
	},
	{
		id: 2,
		title: "Mobile App Development",
		description:
			"Creating user-friendly mobile applications for both Android and iOS platforms.",
		icon: <TabletSmartphone size={64} />,
	},
	{
		id: 3,
		title: "UI/UX Design",
		description:
			"Designing intuitive and engaging user interfaces for web and mobile applications.",
		icon: <LayoutTemplate size={64} />,
	},
];

export default services;
