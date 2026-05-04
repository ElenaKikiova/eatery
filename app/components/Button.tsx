import { ReactNode } from "react";

export const Button = ({ children, onClick }: { children: ReactNode; onClick?: any }) => {
	return (
		<button
			className='cursor-pointer px-4 py-1 bg-[var(--background)] rounded border border-[var(--grey)]'
			{...(onClick && { onClick: onClick })}
		>
			{children}
		</button>
	);
};
