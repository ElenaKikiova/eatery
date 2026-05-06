import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonType = {
	children?: ReactNode;
	type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
	isIcon?: boolean;
	onClick?: () => void;
};

export const Button = ({
	children,
	type = "button" as ButtonHTMLAttributes<HTMLButtonElement>["type"],
	isIcon = false,
	onClick,
}: ButtonType) => {
	const styles = isIcon
		? "h-4 px-0 py-0 text-[var(--lightGrey)]"
		: "px-4 py-1 border border-[var(--grey)]  rounded ";
	return (
		<button
			className={`cursor-pointer ${styles} bg-[var(--background)]`}
			type={type}
			{...(onClick && { onClick: onClick })}
		>
			{children}
		</button>
	);
};
