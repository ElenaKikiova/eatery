"use client";

import { MealDisplay } from "@/app/components/MealDisplay";
import { ERRORS, LOCAL_DB } from "@/app/constants";
import { MealType } from "@/app/types";

import { useEffect, useState } from "react";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Loader } from "@/app/components/Loader";

export default function MyRecipes() {
	const [meals, setMeals] = useState<MealType[] | null>(null);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		fetch(LOCAL_DB)
			.then((response) => response.json())
			.then((data) => {
				setMeals(data);
			})
			.catch((error) => {
				console.log(error);
				setError(ERRORS.LOCAL_RECIPES);
			});
	}, []);

	return (
		<>
			<p className='text-2xl pb-3'>Submitted recipes:</p>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{meals ? (
				meals.length > 0 && (
					<div className='flex flex-col gap-5'>
						{meals.map((meal) => (
							<div className='py-2 border-b border-[var(--grey)]' key={meal.id}>
								<MealDisplay fullDisplay meal={meal} />
							</div>
						))}
					</div>
				)
			) : (
				<Loader />
			)}
		</>
	);
}
