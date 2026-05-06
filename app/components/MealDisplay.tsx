import Link from "next/link";
import { MealType } from "../types";
import { Loader } from "./Loader";
import { Button } from "./Button";

type MealDisplayType = {
	meal: MealType | null;
	fullDisplay?: boolean;
};

export const MealDisplay = ({ meal, fullDisplay = false }: MealDisplayType) => {
	if (meal === null) return <Loader />;

	const { id, thumbnail, name, category, country, ingredientsAndMeasures, recipe } = meal;
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
				<p className='font-bold'>Country: {country}</p>
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
					<Link href={`/meal/by-id/${id}`} className='text-center'>
						<Button>Click to read whole recipe</Button>
					</Link>
				</div>
			)}
		</div>
	);
};
