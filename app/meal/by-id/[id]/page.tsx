"use client";

import { ErrorMessage } from "@/app/components/ErrorMessage";
import { MealDisplay } from "@/app/components/MealDisplay";
import { ERRORS, GET_MEAL_BY_ID_URL } from "@/app/constants";
import { MealType } from "@/app/types";
import { mapMeal } from "@/app/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Meal() {
	const { id } = useParams();
	const [meal, setMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!Number(id)) {
			setError(ERRORS.INVALID_ID);
			return;
		}

		fetch(`${GET_MEAL_BY_ID_URL}${id}`)
			.then((res) => res.json())
			.then(({ meals }) => {
				// Note: when meal id is invalid, the API returns status 200 with { meal: "Invalid id" }
				const meal = meals[0];
				// If meal does not have id, it's not a meal, it's the error message "Invalid id"
				if (!meal.idMeal) throw new Error(meals);
				setMeal(mapMeal(meal));
			})
			.catch((error) => {
				console.error(error);
				setError(ERRORS.BY_ID);
			});
	}, [id]);

	return error ? <ErrorMessage>{error}</ErrorMessage> : <MealDisplay meal={meal} fullDisplay />;
}
