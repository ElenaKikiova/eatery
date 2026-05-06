import { useEffect, useState } from "react";
import { ERRORS, RANDOM_MEAL_URL } from "../constants";
import { mapMeal } from "../utils";
import { MealType } from "../types";
import { MealDisplay } from "./MealDisplay";
import { ErrorMessage } from "./ErrorMessage";

export const RandomMeal = ({ isRandomMealPage = false }: { isRandomMealPage?: boolean }) => {
	const [randomMeal, setRandomMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		fetch(RANDOM_MEAL_URL)
			.then((res) => res.json())
			.then(({ meals }) => setRandomMeal(mapMeal(meals[0])))
			.catch((error) => {
				console.error(error);
				setError(ERRORS.RANDOM_MEAL);
				setRandomMeal(null);
			});
	}, []);

	return (
		<>
			<h2 className='text-2xl my-4 block'>Random meal proposition:</h2>

			{error ? (
				<ErrorMessage>{error}</ErrorMessage>
			) : (
				<MealDisplay meal={randomMeal} fullDisplay={isRandomMealPage} />
			)}
		</>
	);
};
