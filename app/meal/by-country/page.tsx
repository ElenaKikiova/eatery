"use client";

import { ErrorMessage } from "@/app/components/ErrorMessage";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { MealsList } from "@/app/components/MealsList";
import { ERRORS, FITLER_MEALS, LIST_ALL_AREAS_URL } from "@/app/constants";
import { MealType } from "@/app/types";
import { transformResult } from "@/app/utils";
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
				setError(ERRORS.BY_COUNTRY);
			});
	}, [country]);

	return (
		<>
			<FilterDropdown
				label='Country:'
				id='Country'
				fetchUrl={LIST_ALL_AREAS_URL}
				setSelected={setCountry}
				defaultValue='Mexico'
			/>

			{error ? <ErrorMessage>{error}</ErrorMessage> : <MealsList meals={results} />}
		</>
	);
}
