"use client";
import { useEffect, useState } from "react";
import {
	LIST_ALL_AREAS_URL,
	LIST_ALL_CATEGORIES_URL,
	RANDOM_MEAL_URL,
	SEARCH_MEAL_URL,
} from "./constants";
import { Loader } from "./components/Loader";
import { AreaType, CategoryType, Item, MealType } from "./types";
import Search from "./components/Search";
import { MealDisplay } from "./components/MealDisplay";
import { FilterDropdown } from "./components/FilterDropdown";

export default function Home() {
	const [randomMeal, setRandomMeal] = useState<MealType | null>(null);
	const [areas, setAreas] = useState<Item[]>([]);
	const [categories, setCategories] = useState<Item[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(LIST_ALL_CATEGORIES_URL)
			.then((res) => res.json())
			.then(({ meals }) =>
				setCategories(
					meals.map((meal: MealType) => ({
						name: meal.strCategory,
					}))
				)
			)
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setCategories([]);
			});

		fetch(LIST_ALL_AREAS_URL)
			.then((res) => res.json())
			.then(({ meals }) =>
				setAreas(
					meals.map((area: AreaType) => ({
						name: area.strArea,
					}))
				)
			)
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
		<main className='p-15 max-w-xxxl mx-auto'>
			<h1 className='font-bold text-4xl'>THE EATERY</h1>
			<div className='flex'>
				<div className='flex-grow'>
					<FilterDropdown title='Category' list={categories} />
					<FilterDropdown title='Area' list={areas} />
					<Search />
				</div>
				<div className='w-1/4'>
					<h2>Random meal proposition:</h2>
					{randomMeal === null ? <Loader /> : <MealDisplay meal={randomMeal} />}
				</div>
			</div>
		</main>
	);
}
