import { useEffect, useState } from "react";
import { ItemType } from "../types";
import { Loader } from "./Loader";
import { mapFilter } from "@/app/utils";

export const FilterDropdown = ({
	title,
	fetchUrl,
	defaultValue,
	setSelected,
}: {
	title: string;
	fetchUrl: string;
	defaultValue: string;
	setSelected: (value: string) => void;
}) => {
	const [error, setError] = useState<string | null>(null);
	const [items, setItems] = useState<ItemType[]>([]);

	useEffect(() => {
		fetch(fetchUrl)
			.then((res) => res.json())
			.then(({ meals }) =>
				setItems(meals.map((item: ItemType) => mapFilter(item, `str${title}`)))
			)
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setItems([]);
			});
	}, []);

	return (
		<div className='flex gap-3'>
			<label htmlFor={`dropdown-${title}`}>{title}</label>

			{items.length === 0 ? (
				<Loader />
			) : (
				<select
					id={`dropdown-${title}`}
					onChange={(e) => setSelected(e.target.value)}
					defaultValue={defaultValue}
				>
					{items.map((item: ItemType) => (
						<option key={item.name}>{item.name}</option>
					))}
				</select>
			)}
		</div>
	);
};
