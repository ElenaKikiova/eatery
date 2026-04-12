"use client";
import Search from "./components/Search";
import { RandomMeal } from "./components/RandomMeal";

export default function Home() {
	return (
		<main className='px-15 pb-5 w-full max-w-[1200px] mx-auto'>
			<div className='flex gap-5 w-full'>
				<div className='w-2/3'>
					Search:
					<div>
						<Search />
					</div>
				</div>
				<div className='w-1/3 p-4'>
					<RandomMeal />
				</div>
			</div>
		</main>
	);
}
