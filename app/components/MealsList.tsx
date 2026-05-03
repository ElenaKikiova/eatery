import { MealType } from "../types";
import { MealSearchItem } from "./MealSearchItem";

export const MealsList = ({ meals }: { meals: MealType[] }) => {
	if (meals.length === 0) return <p>Not found</p>;

	return (
		<div>
			<h3 className='text-2xl my-4'>Meals:</h3>
			{meals.map((meal) => (
				<MealSearchItem key={meal.id} meal={meal} />
			))}
		</div>
	);
};
