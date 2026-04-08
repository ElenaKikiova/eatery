"use client";
import { useState } from "react";
import { SEARCH_MEAL_URL } from "../constants";
import { MealType } from "../types";
import { MealSearchItem } from "./MealSearchItem";
import { mapMeal } from "../utils";

export default function Search() {
	const [search, setSearch] = useState<string | null>(null);
	const [results, setResults] = useState<MealType[]>([]);
	const [error, setError] = useState<string | null>(null);

	const searchByName = () => {
		fetch(`${SEARCH_MEAL_URL}?s=${search}`)
			.then((res) => res.json())
			.then(({ meals }) => setResults(meals.map(mapMeal)))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching meal");
				setResults([]);
			});
	};

	return (
		<section>
			<div className='flex gap-3'>
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
					<h3 className='font-xl py-2'>Results:</h3>
					{results.map((meal) => (
						<MealSearchItem key={meal.id} meal={meal} />
					))}
				</div>
			)}
		</section>
	);
}
