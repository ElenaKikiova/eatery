"use client";
import { useEffect, useState } from "react";
import {
	LIST_ALL_AREAS_URL,
	LIST_ALL_CATEGORIES_URL,
	RANDOM_MEAL_URL,
	SEARCH_MEAL_URL,
} from "../constants";
import { AreaType, CategoryType, MealType } from "../types";
import { Loader } from "./Loader";

export default function Search() {
	const [search, setSearch] = useState<string | null>(null);
	const [results, setResults] = useState<MealType[]>([]);
	const [error, setError] = useState<string | null>(null);

	const searchByName = () => {
		fetch(`${SEARCH_MEAL_URL}?s=${search}`)
			.then((res) => res.json())
			.then(({ meals }) => setResults(meals))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching meal");
				setResults([]);
			});
	};

	return (
		<section>
			<div>
				<label htmlFor='search'>Search by name:</label>
				<input
					placeholder='Pasta...'
					id='search'
					onChange={(e) => setSearch(e.target.value)}
				></input>
				<button onClick={searchByName}>Search</button>
			</div>
			{results.length > 0 && (
				<div>
					<h3>Results:</h3>
					{results.map((meal) => meal.strMeal)}
				</div>
			)}
		</section>
	);
}
