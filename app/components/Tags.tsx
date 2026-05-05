import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { IconButton } from "./IconButton";

export const Tags = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string>("");
	const addTag = (value: string) => {
		console.log(value);
		setValue(value);
	};

	const onTagAdd = () => {
		if (tags.indexOf(value) > -1) setError("This tag already exists");
		else {
			setError("");
			setTags((prev) => [...prev, value]);
			setValue("");
		}
	};

	const removeTag = (tagName: string) => {
		setTags((prev) => prev.filter((tag) => tag != tagName));
	};

	return (
		<>
			<div className='flex gap-2'>
				<Input id='tagsInput' label='Tag: ' onValueChange={addTag} value={value} />
				<Button onClick={onTagAdd}>Add</Button>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}

			<div className='flex gap-2'>
				{tags.map((tag) => (
					<div
						className='flex gap-1 border border-[var(--grey)] rounded px-2 items-center'
						key={tag}
					>
						{tag}
						<IconButton icon='close' onClick={() => removeTag(tag)} />
					</div>
				))}
			</div>
		</>
	);
};
