import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { IngredientsAndMeasures } from "../types";
import { createEmptyIngredientsRow } from "../utils";

export const IngredientList = ({
	ingredients,
	setIngredients,
}: {
	ingredients: IngredientsAndMeasures[];
	setIngredients: React.Dispatch<React.SetStateAction<IngredientsAndMeasures[]>>;
}) => {
	const [lastId, setLastId] = useState<number>(2);

	const addIngredientRow = () => {
		setIngredients((prev) => [...prev, createEmptyIngredientsRow(lastId)]);
		setLastId((prev) => prev + 1);
	};

	const removeIngredientRow = (id: number) => {
		setIngredients((prev) =>
			prev.filter((ingredient: IngredientsAndMeasures) => ingredient.id !== id)
		);
	};

	const updateIngredientList = (id: number, key: keyof IngredientsAndMeasures, value: string) => {
		setIngredients((prev) =>
			prev.map((ingredient) =>
				ingredient.id === id ? { ...ingredient, [key]: value } : ingredient
			)
		);
	};

	console.log(ingredients);

	return (
		<div>
			{ingredients.map(({ id }: IngredientsAndMeasures, index) => (
				<div className='flex gap-2' key={id}>
					<span># {index + 1}.</span>
					<Input
						id={`ingredient-${id}`}
						label='Ingredient:'
						placeholder='200ml Milk, 2 eggs...'
						onChange={(value) => updateIngredientList(id, "ingredient", value)}
					/>{" "}
					<Input
						id={`measure-${id}`}
						label='Measure:'
						placeholder='200ml Milk, 2 eggs...'
						onChange={(value) => updateIngredientList(id, "measure", value)}
					/>
					<Button onClick={() => removeIngredientRow(id)}>Remove</Button>
				</div>
			))}
			<Button onClick={addIngredientRow}>Add Ingredient</Button>
		</div>
	);
};
