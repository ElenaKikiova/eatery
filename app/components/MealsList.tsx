import { ERRORS } from "../constants";
import { MealType } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { MealSearchItem } from "./MealSearchItem";

export const MealsList = ({
	label = "Search Results:",
	meals,
}: {
	label?: string;
	meals: MealType[] | null;
}) => {
	if (meals === null) return;
	if (meals.length === 0) return <ErrorMessage>{ERRORS.NOT_FOUND}</ErrorMessage>;

	return (
		<div>
			<h3 className='text-2xl my-4'>{label}</h3>
			{meals.map((meal) => (
				<MealSearchItem key={meal.id} meal={meal} />
			))}
		</div>
	);
};
