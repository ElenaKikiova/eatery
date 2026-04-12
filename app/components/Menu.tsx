"use client";
import { useState } from "react";
import { SEARCH_MEAL_URL } from "../constants";
import { MealType } from "../types";
import { MealSearchItem } from "./MealSearchItem";
import { mapMeal } from "../utils";
import Link from "next/link";

export default function Menu() {
	return (
		<nav className='flex p-5 sticky top-0 left-0 bg-[var(--background)]'>
			<Link href='/' className='font-bold text-4xl items-end mx-5'>
				THE EATERY
			</Link>
			<div className='flex items-center justify-center gap-3'>
				<Link href='/meal/random' className='px-2 flex items-end justify-center'>
					Random meal
				</Link>
				<Link href='/meal/by-area' className='px-2 flex items-end justify-center'>
					By area
				</Link>
				<Link href='/meal/by-name' className='px-2 flex items-end justify-center'>
					By name
				</Link>
			</div>
		</nav>
	);
}
