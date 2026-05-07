import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { IngredientsAndMeasures, InputsType } from "../types";
import { createEmptyIngredientsRow } from "../utils";
import { formFields } from "./RecipeForm/formFields";
import { FieldErrors, UseFormRegister, UseFormReset, UseFormUnregister } from "react-hook-form";
import { IconButton } from "./IconButton";
import { ErrorMessage } from "./ErrorMessage";

type IngredientListType = {
	prefill?: IngredientsAndMeasures[];
	register: UseFormRegister<InputsType>;
	unregister: UseFormUnregister<InputsType>;
	reset: UseFormReset<InputsType>;
	errors: FieldErrors<InputsType>;
};

export const IngredientList = ({
	prefill,
	register,
	unregister,
	reset,
	errors,
}: IngredientListType) => {
	const [error, setError] = useState<string>("");
	const [ingredients, setIngredients] = useState<IngredientsAndMeasures[]>([
		createEmptyIngredientsRow(0),
		createEmptyIngredientsRow(1),
	]);

	const [lastId, setLastId] = useState<number>(2);

	useEffect(() => {
		if (prefill) {
			reset();
			setIngredients(prefill);
			const lastItem = prefill.at(-1);
			if (lastItem) setLastId(lastItem.id + 1);
		}
	}, []);

	const addIngredientRow = () => {
		setIngredients((prev) => [...prev, createEmptyIngredientsRow(lastId)]);
		setLastId((prev) => prev + 1);
	};

	const removeIngredientRow = (id: number) => {
		if (ingredients.length === 1) {
			setError("At least one ingredient is required");
		} else {
			setIngredients((prev) =>
				prev.filter((ingredient: IngredientsAndMeasures) => ingredient.id !== id)
			);
			unregister(`ingredientsAndMeasures.${id}`);
		}
	};

	return (
		<div>
			<p className='pb-3'>Ingredients list:</p>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<div className='flex flex-col gap-4'>
				{ingredients.map(({ id, ingredient, measure }: IngredientsAndMeasures, index) => {
					const error =
						errors[`ingredientsAndMeasures`] && errors[`ingredientsAndMeasures`][id];

					register(`ingredientsAndMeasures.${id}.id`, { value: id });
					return (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-2' key={id}>
							<div className='flex gap-2'>
								<span className='h-6 self-center'># {index + 1}.</span>
								<Input
									id={`ingredient-${id}`}
									label='Ingredient:'
									placeholder='200ml Milk, 2 eggs...'
									{...register(`ingredientsAndMeasures.${id}.ingredient`, {
										value: ingredient,
										...formFields.ingredientName,
									})}
									error={error?.ingredient}
								/>
							</div>
							<div className='flex  gap-2'>
								<Input
									id={`measure-${id}`}
									label='Measure:'
									placeholder='200ml Milk, 2 eggs...'
									{...register(`ingredientsAndMeasures.${id}.measure`, {
										value: measure,
										...formFields.ingredientMeasure,
									})}
									error={error?.measure}
								/>
								<div className='pt-2'>
									<IconButton
										icon='close'
										onClick={() => removeIngredientRow(id)}
									/>
								</div>
							</div>
						</div>
					);
				})}
				<Button onClick={addIngredientRow}>Add Ingredient</Button>
			</div>
		</div>
	);
};
