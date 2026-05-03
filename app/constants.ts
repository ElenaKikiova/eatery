export const MEAL_DB = "https://www.themealdb.com/api/json/v1/1/";
export const LIST_ALL_CATEGORIES_URL = `${MEAL_DB}list.php?c=list`;
export const LIST_ALL_AREAS_URL = `${MEAL_DB}list.php?a=list`;
export const RANDOM_MEAL_URL = `${MEAL_DB}random.php`;
export const SEARCH_MEAL_URL = `${MEAL_DB}search.php`;
export const GET_MEAL_BY_ID_URL = `${MEAL_DB}lookup.php?i=`;
export const FITLER_MEALS = `${MEAL_DB}filter.php`;

export const ERRORS = {
	MEAL: "There was an error while fetching meals",
	CATEGORIES_LIST: "There was an error while fetching categories list",
	RANDOM_MEAL: "There was an error while fetching random meal",
	BY_ID: "There was an error while fetching meal information",
	BY_CAEGORY: "There was an error while fetching recipes for the selected category",
	BY_COUNTRY: "There was an error while fetching recipes for the selected country",
	INVALID_ID: "Please enter a valid id",
	NOT_FOUND: "Not found",
};
