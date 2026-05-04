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
	ingredients: {
		required: VALIDATION_ERRORS.REQUIRED,
	},
};
