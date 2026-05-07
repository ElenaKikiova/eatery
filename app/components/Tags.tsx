import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { IconButton } from "./IconButton";

export const Tags = ({ onChange }: { onChange: (tags: string[]) => void }) => {
	const [tags, setTags] = useState<string[]>([]);
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string>("");
	const addTag = (value: string) => {
		setValue(value);
	};

	const onTagAdd = () => {
		const trimmed = value.trim();
		if (trimmed.length === 0) setError("Please enter tag");
		else if (tags.indexOf(value) > -1) setError("This tag already exists");
		else {
			setError("");
			const newTags = [...tags, value];
			setTags(newTags);
			onChange(newTags);
			setValue("");
		}
	};

	const removeTag = (tagName: string) => {
		const newTags = tags.filter((tag) => tag != tagName);
		setTags(newTags);
		onChange(newTags);
	};

	return (
		<div>
			<div className='flex gap-2'>
				<Input id='tagsInput' label='Tags: ' onValueChange={addTag} value={value} />
				<Button onClick={onTagAdd}>Add</Button>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}

			<div className='flex gap-2 py-2'>
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
		</div>
	);
};
