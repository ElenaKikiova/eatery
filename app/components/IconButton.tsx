import { IoMdClose } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "./Button";
import { IconType } from "react-icons";
import { IconSizes } from "../constants";

const ICONS: Record<string, IconType> = {
	close: IoMdClose,
	youtube: FaYoutube,
	edit: MdEdit,
	delete: MdDelete,
};

type IconSizeType = keyof typeof IconSizes;

type IconButtonType = {
	icon: string;
	size?: IconSizeType;
	onClick?: () => void;
};

export const IconButton = ({ icon, size = "small" as IconSizeType, onClick }: IconButtonType) => {
	let Icon = ICONS[icon];
	const sizePx = IconSizes[size];

	return (
		<Button isIcon onClick={onClick}>
			<Icon size={sizePx} />
		</Button>
	);
};
