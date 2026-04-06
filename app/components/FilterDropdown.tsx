import { AreaType, CategoryType, Item } from "../types";
import { Loader } from "./Loader";

export const FilterDropdown = ({ title, list }: { title: string; list: Item[] }) => {
	return (
		<div className='flex gap-3'>
			<label htmlFor={`dropdown-${title}`}>{title}</label>

			{list.length === 0 ? (
				<Loader />
			) : (
				<select id={`dropdown-${title}`}>
					{list.map((item: Item) => (
						<option key={item.name}>{item.name}</option>
					))}
				</select>
			)}
		</div>
	);
};
