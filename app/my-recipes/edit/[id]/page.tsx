"use client";

import { ERRORS, LOCAL_DB } from "@/app/constants";
import { MealType } from "@/app/types";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { RecipeForm } from "@/app/components/RecipeForm/RecipeForm";
import { MealDisplay } from "@/app/components/MealDisplay";
import { useParams } from "next/navigation";
import { Loader } from "@/app/components/Loader";

export default function Edit() {
	const { id } = useParams();
	const [meal, setMeal] = useState<MealType | null>(null);
	const [updated, setUpdated] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		if (!Number(id)) {
			setError(ERRORS.INVALID_ID);
			return;
		}
		fetch(`${LOCAL_DB}/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setMeal(data);
				setError("");
			})
			.catch((err) => {
				console.log(err);
				setError(ERRORS.BY_ID);
			});
	}, []);

	const onSubmit = (data: Omit<MealType, "id">) => {
		fetch(`${LOCAL_DB}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setMeal(data);
				setUpdated(true);
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
			{!meal ? (
				<Loader />
			) : (
				<>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					{updated ? (
						<div>
							<p className='py-3'>Your recipe has been updated</p>
							<MealDisplay meal={meal} fullDisplay />
						</div>
					) : (
						<RecipeForm prefill={meal} onSubmit={onSubmit} />
					)}
				</>
			)}
		</div>
	);
}
