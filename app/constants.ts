export const MEAL_DB = "https://www.themealdb.com/api/json/v1/1/";
export const LIST_ALL_CATEGORIES_URL = `${MEAL_DB}list.php?c=list`;
export const LIST_ALL_AREAS_URL = `${MEAL_DB}list.php?a=list`;
export const RANDOM_MEAL_URL = `${MEAL_DB}random.php`;
export const SEARCH_MEAL_URL = `${MEAL_DB}search.php`;
export const GET_MEAL_BY_ID_URL = `${MEAL_DB}lookup.php?i=`;
export const FITLER_MEALS = `${MEAL_DB}filter.php`;
export const LOCAL_DB = `http://localhost:3001/submitted-recipes`;

export const ERRORS = {
	MEAL: "There was an error while fetching meals",
	CATEGORIES_LIST: "There was an error while fetching categories list",
	RANDOM_MEAL: "There was an error while fetching random meal",
	BY_ID: "There was an error while fetching meal information",
	BY_CAEGORY: "There was an error while fetching recipes for the selected category",
	BY_COUNTRY: "There was an error while fetching recipes for the selected country",
	INVALID_ID: "Please enter a valid id",
	NOT_FOUND: "Not found",
	SAVE_RECIPE: "An error occured while saving your recipe. Please try again later",
	LOCAL_RECIPES: "There was an error while fetching submitted recipes. Please try again later",
};

export const VALIDATORS = {
	NAME: /([A-Za-z0-9]){2,}\w+/,
	URL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
	INGREDIENT_NAME: /([A-Za-z0-9]){1,}\w+/,
	INGREDIENT_MEASURE: /([A-Za-z0-9]){1,}/,
};

export const VALIDATION_ERRORS = {
	REQUIRED: "This field is required",
	NAME: "Name should be at least 3 characters long",
	URL: "Enter a valid url",
	INGREDIENT_NAME: "Ingredient should be at least 2 characters",
	INGREDIENT_MEASURE: "Ingredient measure should be at least 1 character",
};

export const IconSizes = {
	small: "15px",
	medium: "20px",
	big: "35px",
};
