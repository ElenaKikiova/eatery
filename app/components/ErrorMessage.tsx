import { ReactNode } from "react";

type ErrorMessageType = { children: ReactNode; padding?: string };

export const ErrorMessage = ({ children, padding }: ErrorMessageType) => (
	<p className={`text-[var(--red)] ${padding}`}>{children}</p>
);
