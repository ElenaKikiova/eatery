import { VALIDATION_ERRORS, VALIDATORS } from "@/app/constants";

export const formFields = {
	name: {
		required: VALIDATION_ERRORS.REQUIRED,
		pattern: {
			value: VALIDATORS.NAME,
			message: VALIDATION_ERRORS.NAME,
		},
	},
	thumbnail: {
		required: VALIDATION_ERRORS.REQUIRED,
		pattern: {
			value: VALIDATORS.URL,
			message: VALIDATION_ERRORS.URL,
		},
	},
	tags: {
		required: VALIDATION_ERRORS.REQUIRED,
	},
	recipe: {
		required: VALIDATION_ERRORS.REQUIRED,
	},
	ingredientName: {
		required: VALIDATION_ERRORS.REQUIRED,
		pattern: {
			value: VALIDATORS.INGREDIENT_NAME,
			message: VALIDATION_ERRORS.INGREDIENT_NAME,
		},
	},
	ingredientMeasure: {
		required: VALIDATION_ERRORS.REQUIRED,
		pattern: {
			value: VALIDATORS.INGREDIENT_MEASURE,
			message: VALIDATION_ERRORS.INGREDIENT_MEASURE,
		},
	},
};
