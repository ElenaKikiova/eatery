import {
	IngredientAndMeasureKeys,
	IngredientsAndMeasures,
	MealType,
	RawDataFilterType,
	RawMealType,
	RawDataKey,
} from "./types";

export const transformResult = (meals: RawMealType[] | null) => {
	if (meals && meals.length > 0) return meals.map(mapMeal);
	else return [];
};

export const mapFilter = (data: RawDataFilterType, key: RawDataKey) => ({
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
					ingredientsMap[number] = {
						id: Number(number),
						ingredient: "",
						measure: "",
					} as IngredientsAndMeasures;
				}
				ingredientsMap[number][type.toLowerCase() as IngredientAndMeasureKeys] =
					trimmedValue;
				break;
			}
		}
	});

	const ingredientsAndMeasures = Object.values(ingredientsMap);
	const tags = meal.strTags;
	return {
		id: meal.idMeal,
		name: meal.strMeal,
		country: meal.strCountry,
		category: meal.strCategory,
		thumbnail: meal.strMealThumb,
		recipe: meal.strInstructions,
		youtube: meal.strYoutube,
		source: meal.strSource,
		ingredientsAndMeasures,
		tags: tags ? tags.toLowerCase().split(",").join(", ") : null,
	};
};
export const createEmptyIngredientsRow = (id: number) => ({
	id,
	ingredient: "",
	measure: "",
});
