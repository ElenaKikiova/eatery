import { IngredientsAndMeasures, MealType, RawMealType } from "./types";

export const mapFilter = (data: any, key: string) => ({
	name: data[key],
});

export const mapMeal = (meal: RawMealType): MealType => {
	const object = Object.entries(meal);
	const ingredientsMap: Record<string, IngredientsAndMeasures> = {};

	const keywords = ["Ingredient", "Measure"];

	object.forEach(([key, value]) => {
		const trimmedValue = value ? value.trim() : null;
		if (!trimmedValue) return;

		for (const type of keywords) {
			if (key.includes(type)) {
				const number = key.replace(`str${type}`, "");
				if (!ingredientsMap[number]) {
					ingredientsMap[number] = { ingredient: "", measure: "" };
				}
				ingredientsMap[number][type.toLowerCase() as keyof IngredientsAndMeasures] =
					trimmedValue;
				break;
			}
		}
	});

	const ingredientsAndMeasures = Object.values(ingredientsMap);
	return {
		id: meal.idMeal,
		name: meal.strMeal,
		area: meal.strArea,
		category: meal.strCategory,
		thumbnail: meal.strMealThumb,
		ingredientsAndMeasures,
	};
};
