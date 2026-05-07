"use client";

import { MealDisplay } from "@/app/components/MealDisplay";
import { ERRORS, LOCAL_DB } from "@/app/constants";
import { MealType } from "@/app/types";
import { useState } from "react";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { RecipeForm } from "@/app/components/RecipeForm/RecipeForm";

export default function Submit() {
	const [newMeal, setNewMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string>("");

	const onSubmit = (data: Omit<MealType, "id">) => {
		fetch(LOCAL_DB, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setNewMeal(data);
				console.log(data);
				setError("");
			})
			.catch((err) => {
				console.log(err);
				setError(ERRORS.SAVE_RECIPE);
			});
	};

	return (
		<div>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{newMeal ? (
				<div>
					<p className='py-3'>
						Your recipe has been submitted - waiting for admin approval.
					</p>
					<MealDisplay meal={newMeal} fullDisplay />
				</div>
			) : (
				<RecipeForm onSubmit={onSubmit} />
			)}
		</div>
	);
}
