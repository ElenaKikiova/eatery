import { ReactNode } from "react";

export const Button = ({
	children,
	type = "button",
	isIcon = false,
	onClick,
}: {
	children?: ReactNode;
	type?: string;
	isIcon?: boolean;
	onClick?: any;
}) => {
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
