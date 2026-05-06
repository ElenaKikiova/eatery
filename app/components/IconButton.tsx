import { IoMdClose } from "react-icons/io";
import { Button } from "./Button";
import { ButtonHTMLAttributes, ReactNode } from "react";

export const ICONS: Record<string, ReactNode> = {
	close: <IoMdClose />,
};

export const IconButton = ({ icon, onClick }: { icon: string; onClick: () => void }) => {
	let iconElement = ICONS[icon];

	return (
		<Button isIcon {...onClick}>
			{iconElement}
		</Button>
	);
};
