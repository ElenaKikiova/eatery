"use client";
import { RandomMeal } from "./components/RandomMeal";
import { useState } from "react";
import { MealType } from "./types";
import { ERRORS, SEARCH_MEAL_URL } from "./constants";
import { transformResult } from "./utils";
import { MealsList } from "./components/MealsList";
import { ErrorMessage } from "./components/ErrorMessage";

export default function Home() {
	const [search, setSearch] = useState<string | null>(null);
	const [results, setResults] = useState<MealType[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const searchByName = () => {
		if (!search || search.trim() === "") return;
		fetch(`${SEARCH_MEAL_URL}?s=${search}`)
			.then((res) => res.json())
			.then(({ meals }) => {
				setResults(transformResult(meals));
			})
			.catch((error) => {
				console.error(error);
				setError(ERRORS.MEAL);
				setResults([]);
			});
	};

	return (
		<div className='flex gap-5 w-full'>
			<div className='w-2/3'>
				<div className='flex gap-3'>
					<label htmlFor='search'>Search by name:</label>
					<input
						placeholder='Pasta...'
						id='search'
						onChange={(e) => setSearch(e.target.value)}
					></input>
					<button onClick={searchByName}>Search</button>
				</div>

				{error ? (
					<ErrorMessage>{error}</ErrorMessage>
				) : (
					<MealsList meals={results as MealType[]} />
				)}
			</div>
			<div className='w-1/3 p-4'>
				<RandomMeal />
			</div>
		</div>
	);
}
