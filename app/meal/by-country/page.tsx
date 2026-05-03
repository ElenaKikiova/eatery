"use client";

import { FilterDropdown } from "@/app/components/FilterDropdown";
import { MealSearchItem } from "@/app/components/MealSearchItem";
import { MealsList } from "@/app/components/MealsList";
import { FITLER_MEALS, LIST_ALL_AREAS_URL } from "@/app/constants";
import { ItemType, MealType } from "@/app/types";
import { mapFilter, mapMeal, transformResult } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Meal() {
	const [results, setResults] = useState<MealType[]>([]);
	const [country, setCountry] = useState<string | null>("Mexico");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!country) return;
		fetch(`${FITLER_MEALS}?a=${country}`)
			.then((res) => res.json())
			.then(({ meals }) => {
				setResults(transformResult(meals));
			})
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching recipes");
			});
	}, [country]);

	return (
		<>
			<FilterDropdown
				title='Country'
				fetchUrl={LIST_ALL_AREAS_URL}
				setSelected={setCountry}
				defaultValue='Mexico'
			/>

			<MealsList meals={results} />
		</>
	);
}
