"use client";
import { RandomMeal } from "./components/RandomMeal";
import { FilterDropdown } from "./components/FilterDropdown";
import { useEffect, useState } from "react";
import { ItemType, MealType } from "./types";
import { FITLER_MEALS, LIST_ALL_CATEGORIES_URL, SEARCH_MEAL_URL } from "./constants";
import { mapFilter, mapMeal, transformResult } from "./utils";
import { MealSearchItem } from "./components/MealSearchItem";
import { MealsList } from "./components/MealsList";

export default function Home() {
	const [search, setSearch] = useState<string | null>(null);
	const [results, setResults] = useState<MealType[]>([]);
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
				setError("There was an error while fetching meal");
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

				<MealsList meals={results} />
			</div>
			<div className='w-1/3 p-4'>
				<RandomMeal />
			</div>
		</div>
	);
}
