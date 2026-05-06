import { useEffect, useState } from "react";
import { FilterItemType, RawDataFilterType, RawDataKey } from "../types";
import { Loader } from "./Loader";
import { mapFilter } from "@/app/utils";
import { ERRORS } from "../constants";
import { ErrorMessage } from "./ErrorMessage";

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
	const [items, setItems] = useState<FilterItemType[]>([]);

	useEffect(() => {
		fetch(fetchUrl)
			.then((res) => res.json())
			.then(({ meals }) =>
				setItems(
					meals.map((item: RawDataFilterType) =>
						mapFilter(item, `str${id}` as RawDataKey)
					)
				)
			)
			.catch((error) => {
				console.error(error);
				setError(ERRORS.CATEGORIES_LIST);
				setItems([]);
			});
	}, []);

	return (
		<div className='flex gap-3 items-center'>
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
					{items.map((item: FilterItemType) => (
						<option key={item.name}>{item.name}</option>
					))}
				</select>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</div>
	);
};
