"use client";

import { FilterDropdown } from "@/app/components/FilterDropdown";
import { MealSearchItem } from "@/app/components/MealSearchItem";
import { MealsList } from "@/app/components/MealsList";
import { FITLER_MEALS, LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL } from "@/app/constants";
import { ItemType, MealType } from "@/app/types";
import { useEffect, useState } from "react";

export default function Submit() {
	const [category, setCategory] = useState<string | null>("Chicken");
	const [country, setCountry] = useState<string | null>("Mexico");
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<FilterDropdown
				title='Category'
				fetchUrl={LIST_ALL_CATEGORIES_URL}
				setSelected={setCategory}
				defaultValue='Chicken'
			/>
			<FilterDropdown
				title='Country'
				fetchUrl={LIST_ALL_AREAS_URL}
				setSelected={setCountry}
				defaultValue='Mexico'
			/>
		</>
	);
}
