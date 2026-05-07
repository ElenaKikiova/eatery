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
	id: number;
	ingredient: string;
	measure: string;
};

export type IngredientAndMeasureKeys = "ingredient" | "measure";

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
	tags: string | null;
};

export type RawDataKey = "strCategory" | "strCountry";

export type RawDataFilterType = {
	[key in RawDataKey]: string;
};

export type FilterSelection = Record<string, string>;

export type FilterItemType = {
	name: string;
};

export type InputsType = {
	name: string;
	thumbnail: string;
	recipe: string;
	tags: string;
	ingredientsAndMeasures: IngredientsAndMeasures[];
};

export type IconSize = "small" | "big";
