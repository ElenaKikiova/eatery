import { MealType } from "../types";

export const MealDisplay = ({ meal }: { meal: MealType }) => {
	const { strMealThumb: thumbnail, strMeal: name } = meal;
	return (
		<div>
			<img src={thumbnail} />
			<p>{name}</p>
		</div>
	);
};
