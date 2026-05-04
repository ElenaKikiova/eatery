import { useState } from "react";
import { VALIDATION_ERRORS } from "../constants";

export const Input = ({
	id,
	label,
	placeholder,
	multiline = false,
	onChange,
	validatorRegex,
	validationError,
}: {
	id: string;
	label: string;
	placeholder?: string;
	multiline?: boolean;
	onChange?: (value: string) => void;
	validatorRegex?: RegExp;
	validationError?: string;
}) => {
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string>("");

	const onValueChange = (value: string) => {
		if (onChange) onChange(value);
		if (validatorRegex) setValue(value);
	};

	const onBlur = () => {
		const test = validatorRegex?.test(value);
		console.log(test);
		setError(test ? "" : validationError ?? VALIDATION_ERRORS.GENERIC);
	};

	const props = {
		placeholder,
		id: `input-${id}`,
		onChange: (e: any) => onValueChange(e.target.value),
		className: "py-1 px-2 border border-[var(--grey)]",
		onBlur: validatorRegex ? onBlur : undefined,
	};
	return (
		<div className={`flex gap-3 ${multiline ? "flex-col" : "items-center"}`}>
			<label htmlFor={`input-${id}`}>{label}</label>
			{multiline ? <textarea {...props} /> : <input {...props}></input>}
			{error && <p className='text-[var(--red)]'>{error}</p>}
		</div>
	);
};
