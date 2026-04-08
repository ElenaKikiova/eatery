import Link from "next/link";
import { MealType } from "../types";
import { mapMeal } from "../utils";

export const MealSearchItem = ({ key, meal }: { key: string; meal: MealType }) => {
	console.log(meal);
	const { id, thumbnail, name, category, area } = meal;
	return (
		<Link href={`/meal/${id}`} key={key}>
			<div className='flex gap-2 my-5 border border-[var(--grey)]'>
				<img src={thumbnail} className='w-25' />
				<div className='flex flex-col justify-end ml-2'>
					<p className='text-2xl'>{name}</p>
					<p>
						Category: {category} | Area: {area}
					</p>
				</div>
			</div>
		</Link>
	);
};
