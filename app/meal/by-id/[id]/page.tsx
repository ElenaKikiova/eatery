"use client";

import { Loader } from "@/app/components/Loader";
import { MealDisplay } from "@/app/components/MealDisplay";
import { GET_MEAL_BY_ID_URL } from "@/app/constants";
import { MealType } from "@/app/types";
import { mapMeal } from "@/app/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Meal() {
	const { id } = useParams();
	const [meal, setMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(`${GET_MEAL_BY_ID_URL}${id}`)
			.then((res) => res.json())
			.then(({ meals }) => setMeal(mapMeal(meals[0])))
			.catch((error) => {
				console.error(error);
				setError("There was an error while fetching categories");
			});
	}, [id]);

	return meal === null ? <Loader /> : <MealDisplay meal={meal} fullDisplay />;
}
