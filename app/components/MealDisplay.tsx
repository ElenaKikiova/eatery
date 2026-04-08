import { MealType } from "../types";

export const MealDisplay = ({
	meal,
	fullDisplay = true,
}: {
	meal: MealType;
	fullDisplay: boolean;
}) => {
	const { thumbnail, name, category, area, ingredientsAndMeasures } = meal;
	return (
		<div
			className={`relative flex flex-col gap-3 ${
				fullDisplay && "max-h-[600px] overflow-hidden"
			}`}
		>
			<img src={thumbnail} />
			<p className='text-2xl my-2 font-bold'>{name}</p>
			<p className='font-bold'>Category: {category}</p>
			<p className='font-bold'>Area: {area}</p>
			<div>
				<p className='font-bold'>Ingredients: </p>
				{ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
					<p key={index}>
						{ingredient} - {measure}
					</p>
				))}
			</div>
			<div className='flex flex-col justify-end absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--background)]'>
				<button className='cursor-pointer px-4 py-2 bg-[var(--background)] rounded border border-white'>
					Click to read whole recipe
				</button>
			</div>
		</div>
	);
};
