import { ReactNode } from "react";

export const ErrorMessage = ({ children, padding }: { children: ReactNode; padding?: string }) => (
	<p className={`text-[var(--red)] ${padding}`}>{children}</p>
);
