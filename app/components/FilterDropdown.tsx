import { Item } from "../types";
import { Loader } from "./Loader";

export const FilterDropdown = ({
	title,
	list,
	defaultValue,
	setSelected,
}: {
	title: string;
	list: Item[];
	defaultValue: string;
	setSelected: (value: string) => void;
}) => {
	return (
		<div className='flex gap-3'>
			<label htmlFor={`dropdown-${title}`}>{title}</label>

			{list.length === 0 ? (
				<Loader />
			) : (
				<select
					id={`dropdown-${title}`}
					onChange={(e) => setSelected(e.target.value)}
					defaultValue={defaultValue}
				>
					{list.map((item: Item) => (
						<option key={item.name}>{item.name}</option>
					))}
				</select>
			)}
		</div>
	);
};
