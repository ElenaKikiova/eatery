import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { IngredientsAndMeasures, InputsType } from "../types";
import { createEmptyIngredientsRow } from "../utils";
import { formFields } from "../meal/submit/formFields";
import { FieldErrors, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { IconButton } from "./IconButton";

export const IngredientList = ({
	register,
	unregister,
	errors,
}: {
	register: UseFormRegister<InputsType>;
	unregister: UseFormUnregister<InputsType>;
	errors: FieldErrors<InputsType>;
}) => {
	const [error, setError] = useState<string>("");
	const [ingredients, setIngredients] = useState<IngredientsAndMeasures[]>([
		createEmptyIngredientsRow(0),
		createEmptyIngredientsRow(1),
	]);
	const [lastId, setLastId] = useState<number>(2);

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
			<div className='flex flex-col gap-4'>
				{ingredients.map(({ id }: IngredientsAndMeasures, index) => {
					const error =
						errors[`ingredientsAndMeasures`] && errors[`ingredientsAndMeasures`][id];
					return (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-2' key={id}>
							<div className='flex gap-2'>
								<span className='h-6 self-center'># {index + 1}.</span>
								<Input
									id={`ingredient-${id}`}
									label='Ingredient:'
									placeholder='200ml Milk, 2 eggs...'
									{...register(`ingredientsAndMeasures.${id}.ingredient`, {
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
