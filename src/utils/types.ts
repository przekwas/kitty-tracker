export interface IHeaders {
	[key: string]: string;
}

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	AddKitty: { coords: ICoords | null };
};

export interface ICoords {
	latitude: number;
	longitude: number;
	altitude: number;
	accuracy: number;
	heading: number;
	speed: number;
}

export interface Action {
	type?: string;
	token?: null | string;
}

export interface State {
	isLoading?: boolean;
	isSignout?: boolean;
	userToken?: null | string;
}

export interface RegisterData {
	username: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface ICat {
	id: number;
	userid: number;
	cat_nickname: string;
	cat_name: string;
	cat_breed: string;
	lat: number;
	lng: number;
	created_at: Date;
}
