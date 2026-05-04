"use client";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { MealsList } from "@/app/components/MealsList";
import { ERRORS, FITLER_MEALS, LIST_ALL_CATEGORIES_URL } from "@/app/constants";
import { MealType } from "@/app/types";
import { transformResult } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Meal() {
	const [category, setCategory] = useState<string | null>("Chicken");
	const [results, setResults] = useState<MealType[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!category) return;
		fetch(`${FITLER_MEALS}?c=${category}`)
			.then((res) => res.json())
			.then(({ meals }) => {
				setResults(transformResult(meals));
			})
			.catch((error) => {
				console.error(error);
				setError(ERRORS.BY_CAEGORY);
			});
	}, [category]);

	return (
		<>
			<FilterDropdown
				label='Category:'
				id='Category'
				defaultValue='Chicken'
				fetchUrl={LIST_ALL_CATEGORIES_URL}
				setSelected={setCategory}
			/>

			{error ? <ErrorMessage>{error}</ErrorMessage> : <MealsList meals={results} />}
		</>
	);
}
