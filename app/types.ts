export type CategoryType = {
	strCategory: string;
};

export type CountryType = {
	strCountry: string;
};

export type RawMealType = {
	strCountry: string;
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
	country: string;
	thumbnail: string;
	category: string;
	ingredientsAndMeasures: IngredientsAndMeasures[];
	recipe: string;
	source: string;
	youtube: string;
	tags: string;
};

export type ItemType = {
	name: string;
};

export type FilterSelection = Record<string, string>;
