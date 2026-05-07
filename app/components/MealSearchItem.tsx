import Link from "next/link";
import { MealType } from "../types";

export const MealSearchItem = ({ meal }: { meal: MealType }) => {
	const { id, thumbnail, name, category, country } = meal;
	return (
		<Link href={`/meals/by-id/${id}`} key={meal.id}>
			<div className='flex gap-2 my-5 border border-[var(--grey)]'>
				<img src={thumbnail} className='w-25' />
				<div className='flex flex-col justify-end ml-2'>
					<p className='text-2xl'>{name}</p>
					<p>
						Category: {category} | Country: {country}
					</p>
				</div>
			</div>
		</Link>
	);
};
