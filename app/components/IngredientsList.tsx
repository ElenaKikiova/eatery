import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { IngredientsAndMeasures, InputsType } from "../types";
import { createEmptyIngredientsRow } from "../utils";
import { formFields } from "../meal/submit/formFields";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";

export const IngredientList = ({
	register,
	unregister,
}: {
	register: UseFormRegister<InputsType>;
	unregister: UseFormUnregister<InputsType>;
}) => {
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
		setIngredients((prev) =>
			prev.filter((ingredient: IngredientsAndMeasures) => ingredient.id !== id)
		);
		unregister(`ingredientsAndMeasures.${id}`);
	};

	return (
		<div>
			{ingredients.map(({ id }: IngredientsAndMeasures, index) => (
				<div className='flex gap-2' key={id}>
					<span># {index + 1}.</span>
					<Input
						id={`ingredient-${id}`}
						label='Ingredient:'
						placeholder='200ml Milk, 2 eggs...'
						{...register(`ingredientsAndMeasures.${id}.ingredient`, {
							...formFields.ingredients,
						})}
					/>

					<Input
						id={`measure-${id}`}
						label='Measure:'
						placeholder='200ml Milk, 2 eggs...'
						{...register(`ingredientsAndMeasures.${id}.measure`)}
					/>
					<Button onClick={() => removeIngredientRow(id)}>Remove</Button>
				</div>
			))}
			<Button onClick={addIngredientRow}>Add Ingredient</Button>
		</div>
	);
};
