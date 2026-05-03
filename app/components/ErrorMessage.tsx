import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => (
	<p className='text-[var(--red)] my-4'>{children}</p>
);
