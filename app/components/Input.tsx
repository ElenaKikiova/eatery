export const Input = ({
	id,
	label,
	placeholder,
	multiline = false,
	onChange,
}: {
	id: string;
	label: string;
	placeholder?: string;
	multiline?: boolean;
	onChange?: (value: string) => void;
}) => {
	const props = {
		placeholder,
		id: `input-${id}`,
		...(onChange && { onChange: (e: any) => onChange(e.target.value) }),
		className: "py-1 px-2 border border-[var(--grey)]",
	};
	return (
		<div className={`flex gap-3 ${multiline ? "flex-col" : "items-center"}`}>
			<label htmlFor={`input-${id}`}>{label}</label>
			{multiline ? <textarea {...props} /> : <input {...props}></input>}
		</div>
	);
};
