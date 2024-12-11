import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {Failure} from "@/app/lib/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const hasErrorResult = <T>(result: T | unknown): result is Failure => {
	console.log(result);
	return (result as Failure).errorCode !== undefined;
};
