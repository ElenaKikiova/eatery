"use client";

import { FilterDropdown } from "@/app/components/FilterDropdown";
import { MealSearchItem } from "@/app/components/MealSearchItem";
import { FITLER_MEALS, LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL } from "@/app/constants";
import { Item, MealType } from "@/app/types";
import { mapFilter, mapMeal } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Meal() {
	const [category, setCategory] = useState<string | null>("Breakfast");
	const [results, setResults] = useState<MealType[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [categories, setCategories] = useState<Item[]>([]);

	useEffect(() => {
		fetch(LIST_ALL_CATEGORIES_URL)
			.then((res) => res.json())
			.then(({ meals }) => setCategories(meals.map((item) => mapFilter(item, "strCategory"))))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setCategories([]);
			});
	}, []);

	useEffect(() => {
		if (!category) return;
		fetch(`${FITLER_MEALS}?c=${category}`)
			.then((res) => res.json())
			.then(({ meals }) => setResults(meals.map(mapMeal)))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setCategories([]);
			});
	}, [category]);

	return (
		<>
			<FilterDropdown
				title='Area'
				list={categories}
				setSelected={setCategory}
				defaultValue='Breakfast'
			/>

			{results.length > 0 && (
				<div>
					<h3 className='text-2xl my-4'>Results:</h3>
					{results.map((meal) => (
						<MealSearchItem key={meal.id} meal={meal} />
					))}
				</div>
			)}
		</>
	);
}
