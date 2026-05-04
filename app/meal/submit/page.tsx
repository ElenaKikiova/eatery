"use client";

import { FilterDropdown } from "@/app/components/FilterDropdown";
import { Input } from "@/app/components/Input";
import { MealSearchItem } from "@/app/components/MealSearchItem";
import { MealsList } from "@/app/components/MealsList";
import { FITLER_MEALS, LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL } from "@/app/constants";
import { ItemType, MealType } from "@/app/types";
import { useEffect, useState } from "react";

export default function Submit() {
	const [name, setName] = useState<string | null>(null);
	const [category, setCategory] = useState<string | null>("Chicken");
	const [country, setCountry] = useState<string | null>("Mexico");
	const [recipe, setRecipe] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	return (
		<div className='flex gap-3 flex-col'>
			<Input id='name' label='Name:' onChange={setName} />
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
			<Input
				multiline
				id='ingredients'
				label='Ingredients:'
				placeholder='200ml Milk, 2 eggs...'
			/>
			<Input
				multiline
				id='recipe'
				label='Recipe:'
				placeholder='Mix milk, oil and egg together...'
			/>
		</div>
	);
}
