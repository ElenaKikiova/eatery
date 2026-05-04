import { useEffect, useState } from "react";
import { ItemType } from "../types";
import { Loader } from "./Loader";
import { mapFilter } from "@/app/utils";
import { ERRORS } from "../constants";

export const FilterDropdown = ({
	id,
	label,
	fetchUrl,
	defaultValue,
	setSelected,
}: {
	id: string;
	label: string;
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
				setItems(meals.map((item: ItemType) => mapFilter(item, `str${id}`)))
			)
			.catch((error) => {
				console.error(error);
				setError(ERRORS.CATEGORIES_LIST);
				setItems([]);
			});
	}, []);

	return (
		<div className='flex gap-3 my-2 items-center'>
			<label htmlFor={`dropdown-${id}`}>{label}</label>

			{items.length === 0 ? (
				<Loader />
			) : (
				<select
					id={`dropdown-${id}`}
					onChange={(e) => setSelected(e.target.value)}
					defaultValue={defaultValue}
					className='py-2 px-2 border border-[var(--grey)]'
				>
					{items.map((item: ItemType) => (
						<option key={item.name}>{item.name}</option>
					))}
				</select>
			)}
		</div>
	);
};
