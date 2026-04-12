import Link from "next/link";
import { MealType } from "../types";
import { mapMeal } from "../utils";

export const MealSearchItem = ({ meal }: { meal: MealType }) => {
	const { id, thumbnail, name, category, area } = meal;
	return (
		<Link href={`/meal/by-id/${id}`}>
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
