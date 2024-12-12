export interface User {
	id: string;
	email: string;
	name: string;
}

export interface Failure {
	errorCode: number;
	message: string;
}
