import Link from "next/link";
import { MealType } from "../types";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { redirect } from "next/navigation";

type MealDisplayType = {
	meal: MealType | null;
	fullDisplay?: boolean;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
};

export const MealDisplay = ({ meal, fullDisplay = false, onEdit, onDelete }: MealDisplayType) => {
	if (meal === null) return <Loader />;

	const {
		id,
		thumbnail,
		name,
		category,
		country,
		ingredientsAndMeasures,
		recipe,
		youtube,
		tags,
	} = meal;

	const goToEdit = (id: string) => console.log(id);

	return (
		<div
			className={`relative flex flex-col gap-2 ${
				!fullDisplay && "max-h-[600px] overflow-hidden"
			}`}
		>
			<div>
				<img
					src={thumbnail}
					className={fullDisplay ? "float-left max-w-[250px] mr-4 mb-2" : ""}
				/>
				<div className='flex gap-2'>
					<p className='text-2xl my-1'>{name}</p>
					{onEdit && onDelete && (
						<>
							<IconButton icon='edit' size='medium' onClick={() => onEdit(id)} />
							<IconButton icon='delete' size='medium' onClick={() => onDelete(id)} />
						</>
					)}
				</div>
				<p className='font-bold'>Category: {category}</p>
				<p className='font-bold'>Country: {country}</p>
				{tags && <p className='font-bold'>Tags: {tags}</p>}
				<div className='my-4'>
					<p className='font-bold'>Ingredients: </p>
					{ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
						<p key={index}>
							{ingredient} - {measure}
						</p>
					))}
				</div>
				{fullDisplay && (
					<div>
						{youtube ? (
							<div className='flex gap-2 items-center'>
								<p className='font-bold'>Recipe: also available on Youtube!</p>
								<IconButton
									icon='youtube'
									size='big'
									onClick={() => redirect(youtube)}
								/>
							</div>
						) : (
							<p className='font-bold'>Recipe:</p>
						)}
						<p>{recipe}</p>
					</div>
				)}
			</div>
			{!fullDisplay && (
				<div className='flex flex-col justify-end absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--background)]'>
					<Link href={`/meals/by-id/${id}`} className='text-center'>
						<Button>Click to read whole recipe</Button>
					</Link>
				</div>
			)}
		</div>
	);
};
