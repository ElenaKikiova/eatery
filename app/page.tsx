"use client";
import { useEffect, useState } from "react";
import { LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL, RANDOM_MEAL_URL } from "./constants";
import { Loader } from "./components/Loader";
import { Item, MealType } from "./types";
import Search from "./components/Search";
import { MealDisplay } from "./components/MealDisplay";
import { FilterDropdown } from "./components/FilterDropdown";
import { mapFilter, mapMeal } from "./utils";

export default function Home() {
	const [randomMeal, setRandomMeal] = useState<MealType | null>(null);
	const [areas, setAreas] = useState<Item[]>([]);
	const [categories, setCategories] = useState<Item[]>([]);
	const [error, setError] = useState<string | null>(null);

	console.log(randomMeal);

	useEffect(() => {
		fetch(LIST_ALL_CATEGORIES_URL)
			.then((res) => res.json())
			.then(({ meals }) => setCategories(meals.map((item) => mapFilter(item, "strCategory"))))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
				setCategories([]);
			});

		fetch(LIST_ALL_AREAS_URL)
			.then((res) => res.json())
			.then(({ meals }) => setAreas(meals.map((item) => mapFilter(item, "strArea"))))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching areas");
				setAreas([]);
			});

		fetch(RANDOM_MEAL_URL)
			.then((res) => res.json())
			.then(({ meals }) => setRandomMeal(mapMeal(meals[0])))
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
				<div className='w-1/3 p-4'>
					<h2 className='text-2xl my-4'>Random meal proposition:</h2>
					{randomMeal === null ? <Loader /> : <MealDisplay meal={randomMeal} />}
				</div>
			</div>
		</main>
	);
}
