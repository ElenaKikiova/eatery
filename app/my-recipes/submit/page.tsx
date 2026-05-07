"use client";

import { Button } from "@/app/components/Button";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { IngredientList } from "@/app/components/IngredientsList";
import { Input } from "@/app/components/Input";
import { MealDisplay } from "@/app/components/MealDisplay";
import { ERRORS, LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL, LOCAL_DB } from "@/app/constants";
import { InputsType, MealType } from "@/app/types";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formFields } from "./formFields";
import { Tags } from "@/app/components/Tags";
import { ErrorMessage } from "@/app/components/ErrorMessage";

export default function Submit() {
	const {
		register,
		unregister,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsType>();

	const [category, setCategory] = useState<string>("Chicken");
	const [country, setCountry] = useState<string>("Mexico");
	const [tags, setTags] = useState<string[]>([]);
	const [newMeal, setNewMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string>("");

	const onSubmit: SubmitHandler<InputsType> = (data) => {
		const recipeObj = {
			...data,
			category,
			country,
			tags: tags.join(", "),
			source: "User",
			youtube: "",
		};

		fetch(LOCAL_DB, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(recipeObj),
		})
			.then((response) => response.json())
			.then((data) => {
				setNewMeal(data);
				console.log(recipeObj);
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
				<form onSubmit={handleSubmit(onSubmit)} className='flex gap-5 flex-col'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						<div className='flex flex-col gap-4'>
							<Input
								id='name'
								label='Name:'
								{...register("name", { ...formFields.name })}
								error={errors.name}
							/>
							<Input
								id='thumbnail'
								label='Thumbnail URL:'
								{...register("thumbnail", { ...formFields.thumbnail })}
								error={errors.thumbnail}
							/>
						</div>
						<div className='flex flex-col gap-4'>
							<FilterDropdown
								label='Category:'
								id='Category'
								fetchUrl={LIST_ALL_CATEGORIES_URL}
								setSelected={setCategory}
								defaultValue='Chicken'
							/>
							<FilterDropdown
								label='Country:'
								id='Country'
								fetchUrl={LIST_ALL_AREAS_URL}
								setSelected={setCountry}
								defaultValue='Mexico'
							/>
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						<Tags onChange={setTags} />
						<IngredientList
							register={register}
							unregister={unregister}
							errors={errors}
						/>

						<Input
							multiline
							id='recipe'
							label='Recipe:'
							placeholder='Mix milk, oil and egg together...'
							{...register("recipe", { ...formFields.recipe })}
							error={errors.recipe}
						/>
					</div>
					<Button type='submit'>Submit</Button>
				</form>
			)}
		</div>
	);
}
