import { FieldError } from "react-hook-form";

export const Input = ({
	id,
	label,
	placeholder,
	multiline = false,
	onValueChange,
	value,
	error,
	...rest
}: {
	id: string;
	label: string;
	placeholder?: string;
	multiline?: boolean;
	value?: string;
	error?: FieldError;
	onValueChange?: (value: string) => void;
}) => {
	const props = {
		placeholder,
		id: `input-${id}`,
		onChange: (e: any) => (onValueChange ? onValueChange(e.target.value) : undefined),
		className: "py-1 px-2 border border-[var(--grey)]",
		value,
		...rest,
	};
	return (
		<div className={`flex gap-3 ${multiline ? "flex-col" : "items-center"}`}>
			<label htmlFor={`input-${id}`}>{label}</label>
			{multiline ? <textarea {...props} /> : <input {...props}></input>}
			{error && <p className='text-[var(--red)]'>{error.message}</p>}
		</div>
	);
};
