import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => (
	<p className='text-[var(--red)]'>{children}</p>
);
