import type { Failure } from "@/app/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const hasErrorResult = <T>(result: T | unknown): result is Failure => {
	return (result as Failure)?.errorCode !== undefined;
};

export const getValidParams = <T>(params: T): Partial<T> => {
	const validParams: Partial<T> = {};
	for (const key in params) {
		if (params[key] !== undefined) {
			validParams[key] = params[key];
		}
	}
	return validParams;
};
