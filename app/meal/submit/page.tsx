"use client";

import { Button } from "@/app/components/Button";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { IngredientList } from "@/app/components/IngredientsList";
import { Input } from "@/app/components/Input";
import { MealDisplay } from "@/app/components/MealDisplay";
import { LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL } from "@/app/constants";
import { InputsType, MealType } from "@/app/types";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formFields } from "./formFields";
import { Tags } from "@/app/components/Tags";

export default function Submit() {
	const {
		register,
		unregister,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsType>();

	const [category, setCategory] = useState<string>("Chicken");
	const [country, setCountry] = useState<string>("Mexico");
	const [newMeal, setNewMeal] = useState<MealType | null>(null);

	const onSubmit: SubmitHandler<InputsType> = (data) => {
		console.log(data);

		const recipeObj = {
			...data,
			id: "0",
			category,
			country,
			source: "User",
			youtube: "",
		};
		setNewMeal(recipeObj);
		console.log(recipeObj);
	};

	return (
		<div>
			{newMeal ? (
				<div className=''>
					Your recipe has been submitted - waiting for admin approval:
					<MealDisplay meal={newMeal} fullDisplay />
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className='flex gap-5 flex-col'>
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
					<Tags />
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
					<IngredientList register={register} unregister={unregister} />

					<Input
						multiline
						id='recipe'
						label='Recipe:'
						placeholder='Mix milk, oil and egg together...'
						{...register("recipe", { ...formFields.recipe })}
						error={errors.recipe}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			)}
		</div>
	);
}
