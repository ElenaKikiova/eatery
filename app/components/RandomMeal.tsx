import { useEffect, useState } from "react";
import { RANDOM_MEAL_URL } from "../constants";
import { mapMeal } from "../utils";
import { MealType } from "../types";
import { Loader } from "./Loader";
import { MealDisplay } from "./MealDisplay";

export const RandomMeal = () => {
	const [randomMeal, setRandomMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
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
		<>
			<h2 className='text-2xl my-4'>Random meal proposition:</h2>
			{randomMeal === null ? <Loader /> : <MealDisplay meal={randomMeal} />}
		</>
	);
};
