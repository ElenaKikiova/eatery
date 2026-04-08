import Link from "next/link";
import { MealType } from "../types";

export const MealDisplay = ({
	meal,
	fullDisplay = false,
}: {
	meal: MealType;
	fullDisplay?: boolean;
}) => {
	const { id, thumbnail, name, category, area, ingredientsAndMeasures, recipe } = meal;
	return (
		<div
			className={`relative flex flex-col gap-2 ${
				!fullDisplay && "max-h-[600px] overflow-hidden"
			}`}
		>
			<div>
				<img
					src={thumbnail}
					className={fullDisplay ? "float-left max-w-[400px] mr-4 mb-2" : ""}
				/>
				<p className='text-2xl my-1'>{name}</p>
				<p className='font-bold'>Category: {category}</p>
				<p className='font-bold'>Area: {area}</p>
				<p className='font-bold mt-4'>Ingredients: </p>
				{ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
					<p key={index}>
						{ingredient} - {measure}
					</p>
				))}
				{fullDisplay && (
					<>
						<p className='font-bold mt-4'>Recipe: </p>
						<p>{recipe}</p>
					</>
				)}
			</div>
			{!fullDisplay && (
				<div className='flex flex-col justify-end absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--background)]'>
					<Link href={`/meal/${id}`}>
						<button className='cursor-pointer px-4 py-2 bg-[var(--background)] rounded border border-[var(--grey)]'>
							Click to read whole recipe
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};
