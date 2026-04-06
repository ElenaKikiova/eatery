"use client";
import { useEffect, useState } from "react";
import {
	LIST_ALL_AREAS_URL,
	LIST_ALL_CATEGORIES_URL,
	RANDOM_MEAL_URL,
	SEARCH_MEAL_URL,
} from "./constants";
import { Loader } from "./components/Loader";
import { AreaType, CategoryType, MealType } from "./types";
import Search from "./components/Search";
import { MealDisplay } from "./components/MealDisplay";

export default function Home() {
	const [randomMeal, setRandomMeal] = useState<MealType | null>(null);
	const [areas, setAreas] = useState<AreaType[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(LIST_ALL_CATEGORIES_URL)
			.then((res) => res.json())
			.then(({ meals }) => setCategories(meals))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setCategories([]);
			});

		fetch(LIST_ALL_AREAS_URL)
			.then((res) => res.json())
			.then(({ meals }) => setAreas(meals))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching areas");
				setAreas([]);
			});

		fetch(RANDOM_MEAL_URL)
			.then((res) => res.json())
			.then(({ meals }) => setRandomMeal(meals[0]))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching random meal");
				setRandomMeal(null);
			});
	}, []);

	return (
		<section>
			<h1>THE EATERY</h1>
			<div>
				<h2>Categories</h2>

				{categories.length === 0 ? (
					<Loader />
				) : (
					<select>
						{categories.map((category: CategoryType) => (
							<option key={category.strCategory}>{category.strCategory}</option>
						))}
					</select>
				)}

				{areas.length === 0 ? (
					<Loader />
				) : (
					<select>
						{areas.map((area: AreaType) => (
							<option key={area.strArea}>{area.strArea}</option>
						))}
					</select>
				)}

				<Search />
			</div>
			<aside>
				<h2>Random meal proposition:</h2>
				{randomMeal === null ? <Loader /> : <MealDisplay meal={randomMeal} />}
			</aside>
		</section>
	);
}
