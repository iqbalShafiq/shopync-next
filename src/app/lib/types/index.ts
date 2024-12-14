export interface User {
	id: string;
	email: string;
	name: string;
}

export interface Failure {
	errorCode: number;
	message: string;
}

export interface PaginatedResult<T> {
	data: T[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
	};
}
