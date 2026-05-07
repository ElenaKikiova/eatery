import { IoMdClose } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { Button } from "./Button";
import { IconType } from "react-icons";
import { IconSize } from "../types";

const ICONS: Record<string, IconType> = {
	close: IoMdClose,
	youtube: FaYoutube,
};

type IconButtonType = {
	icon: string;
	size?: IconSize;
	onClick?: () => void;
};

export const IconButton = ({ icon, size = "small" as IconSize, onClick }: IconButtonType) => {
	let Icon = ICONS[icon];
	const sizePx = size === "small" ? "15px" : "35px";

	return (
		<Button isIcon onClick={onClick}>
			<Icon size={sizePx} />
		</Button>
	);
};
