"use client";

import { FilterDropdown } from "@/app/components/FilterDropdown";
import { MealSearchItem } from "@/app/components/MealSearchItem";
import { FITLER_MEALS, LIST_ALL_AREAS_URL } from "@/app/constants";
import { Item, MealType } from "@/app/types";
import { mapFilter, mapMeal } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Meal() {
	const [areas, setAreas] = useState<Item[]>([]);
	const [results, setResults] = useState<MealType[]>([]);
	const [area, setArea] = useState<string | null>("Mexican");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(LIST_ALL_AREAS_URL)
			.then((res) => res.json())
			.then(({ meals }) => setAreas(meals.map((item) => mapFilter(item, "strArea"))))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching areas");
				setAreas([]);
			});
	}, []);

	useEffect(() => {
		if (!area) return;
		fetch(`${FITLER_MEALS}?a=${area}`)
			.then((res) => res.json())
			.then(({ meals }) => setResults(meals.map(mapMeal)))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setArea(null);
			});
	}, [area]);

	return (
		<main className='p-15 w-full max-w-[1200px]  mx-auto'>
			<FilterDropdown
				title='Area'
				list={areas}
				setSelected={setArea}
				defaultValue='Mexican'
			/>

			{results.length > 0 && (
				<div>
					<h3 className='text-2xl my-4'>Results:</h3>
					{results.map((meal) => (
						<MealSearchItem key={meal.id} meal={meal} />
					))}
				</div>
			)}
		</main>
	);
}
