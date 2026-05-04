"use client";

import { Button } from "@/app/components/Button";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { IngredientList } from "@/app/components/IngredientsList";
import { Input } from "@/app/components/Input";
import { MealDisplay } from "@/app/components/MealDisplay";
import {
	LIST_ALL_AREAS_URL,
	LIST_ALL_CATEGORIES_URL,
	VALIDATION_ERRORS,
	VALIDATORS,
} from "@/app/constants";
import { IngredientsAndMeasures, MealType } from "@/app/types";
import { createEmptyIngredientsRow } from "@/app/utils";
import { useState } from "react";

export default function Submit() {
	const [name, setName] = useState<string | null>(null);
	const [thumbnailUrl, setThumbnailURL] = useState<string | null>(null);
	const [category, setCategory] = useState<string | null>("Chicken");
	const [country, setCountry] = useState<string | null>("Mexico");
	const [recipe, setRecipe] = useState<string | null>(null);
	const [tags, setTags] = useState<string | null>(null);
	const [ingredients, setIngredients] = useState<IngredientsAndMeasures[]>([
		createEmptyIngredientsRow(0),
		createEmptyIngredientsRow(1),
	]);
	const [newMeal, setNewMeal] = useState<MealType | null>(null);
	const [error, setError] = useState<string | null>(null);

	const submit = () => {
		const recipeObj = {
			id: "1",
			thumbnail: thumbnailUrl,
			name,
			category,
			country,
			recipe,
			source: "User",
			youtube: "",
			tags,
			ingredientsAndMeasures: ingredients,
		};
		setNewMeal(recipeObj);
		console.log(recipeObj);
	};

	return (
		<div className='flex gap-3 flex-col'>
			{newMeal ? (
				<div className=''>
					Your recipe has been submitted - waiting for admin approval:
					<MealDisplay meal={newMeal} fullDisplay />
				</div>
			) : (
				<div className='flex gap-3 flex-col'>
					<Input
						id='name'
						label='Name:'
						onChange={setName}
						validatorRegex={VALIDATORS.NAME}
						validationError={VALIDATION_ERRORS.NAME}
					/>
					<Input
						id='thumbnailURL'
						label='Thumbnail URL:'
						onChange={setThumbnailURL}
						validatorRegex={VALIDATORS.URL}
						validationError={VALIDATION_ERRORS.URL}
					/>
					<Input id='tags' label='Tags' onChange={setTags} />
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
					<IngredientList ingredients={ingredients} setIngredients={setIngredients} />

					<Input
						multiline
						id='recipe'
						label='Recipe:'
						placeholder='Mix milk, oil and egg together...'
						onChange={setRecipe}
					/>
					<Button onClick={submit}>Submit</Button>
				</div>
			)}
		</div>
	);
}
