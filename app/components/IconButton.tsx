import { IoMdClose } from "react-icons/io";
import { Button } from "./Button";
import { ReactNode } from "react";

export const ICONS: Record<string, ReactNode> = {
	close: <IoMdClose />,
};

export const IconButton = ({ icon, ...rest }: { icon: string }) => {
	let iconElement = ICONS[icon];

	return (
		<Button isIcon {...rest}>
			{iconElement}
		</Button>
	);
};
