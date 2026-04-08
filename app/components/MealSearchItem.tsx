import { MealType } from "../types";
import { mapMeal } from "../utils";

export const MealSearchItem = ({ key, meal }: { key: string; meal: MealType }) => {
	console.log(meal);
	const { thumbnail, name, category } = meal;
	return (
		<div className='flex gap-2 m-5' key={key}>
			<img src={thumbnail} className='w-25' />
			<div>
				<p className='font-xl'>{name}</p>
				<p>Category: {category}</p>
			</div>
		</div>
	);
};
