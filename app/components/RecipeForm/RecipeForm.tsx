import { Button } from "@/app/components/Button";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { IngredientList } from "@/app/components/IngredientsList";
import { Input } from "@/app/components/Input";
import { MealDisplay } from "@/app/components/MealDisplay";
import { ERRORS, LIST_ALL_AREAS_URL, LIST_ALL_CATEGORIES_URL, LOCAL_DB } from "@/app/constants";
import { InputsType, MealType } from "@/app/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formFields } from "../../components/RecipeForm/formFields";
import { Tags } from "@/app/components/Tags";

export const RecipeForm = ({
	prefill,
	onSubmit,
}: {
	prefill?: MealType;
	onSubmit: (data: Omit<MealType, "id">) => void;
}) => {
	const {
		register,
		unregister,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsType>();

	const [category, setCategory] = useState<string>(prefill?.category || "Chicken");
	const [country, setCountry] = useState<string>(prefill?.country || "Mexico");
	const [tags, setTags] = useState<string[]>(prefill?.tags ? prefill.tags.split(",") : []);

	const submitForm: SubmitHandler<InputsType> = (data) => {
		const recipeObj: Omit<MealType, "id"> = {
			...data,
			ingredientsAndMeasures: data.ingredientsAndMeasures.filter((item) => item != null),
			category,
			country,
			tags: tags.join(","),
			source: "User",
			youtube: "",
		};

		onSubmit(recipeObj);
	};

	return (
		<form onSubmit={handleSubmit(submitForm)} className='flex gap-5 flex-col'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
				<div className='flex flex-col gap-4'>
					<Input
						id='name'
						label='Name:'
						{...register("name", { value: prefill?.name, ...formFields.name })}
						error={errors.name}
					/>
					<Input
						id='thumbnail'
						label='Thumbnail URL:'
						{...register("thumbnail", {
							value: prefill?.thumbnail,
							...formFields.thumbnail,
						})}
						error={errors.thumbnail}
					/>
				</div>
				<div className='flex flex-col gap-4'>
					<FilterDropdown
						label='Category:'
						id='Category'
						fetchUrl={LIST_ALL_CATEGORIES_URL}
						setSelected={setCategory}
						defaultValue={prefill?.category}
					/>
					<FilterDropdown
						label='Country:'
						id='Country'
						fetchUrl={LIST_ALL_AREAS_URL}
						setSelected={setCountry}
						defaultValue={prefill?.country}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<Tags prefill={prefill?.tags} onChange={setTags} />
				<IngredientList
					prefill={prefill?.ingredientsAndMeasures}
					register={register}
					unregister={unregister}
					reset={reset}
					errors={errors}
				/>

				<Input
					multiline
					id='recipe'
					label='Recipe:'
					placeholder='Mix milk, oil and egg together...'
					{...register("recipe", { value: prefill?.recipe, ...formFields.recipe })}
					error={errors.recipe}
				/>
			</div>
			<Button type='submit'>Submit</Button>
		</form>
	);
};
