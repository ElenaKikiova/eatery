export type CategoryType = {
	strCategory: string;
};

export type AreaType = {
	strArea: string;
};

export type RawMealType = {
	strArea: string;
	strCategory: string;
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
	strSource: string;
	strYoutube: string;
	strTags: string;
};

export type IngredientsAndMeasures = {
	ingredient: string;
	measure: string;
};

export type MealType = {
	id: string;
	name: string;
	area: string;
	thumbnail: string;
	category: string;
	ingredientsAndMeasures: IngredientsAndMeasures[];
	recipe: string;
	source: string;
	youtube: string;
	tags: string;
};

export type Item = {
	name: string;
};

export type FilterSelection = Record<string, string>;
