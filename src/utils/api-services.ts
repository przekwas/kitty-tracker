import { AsyncStorage } from 'react-native';
import type { IHeaders } from './types';

export const getToken = async () => {
	let token = (await AsyncStorage.getItem('token')) || null;
	return token;
};

export const setToken = async (token: string) => {
    await AsyncStorage.setItem('token', token);
}

export const clearToken = async () => {
    await AsyncStorage.removeItem('token');
}

export const setStorage = async (token: string, role: string) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('role', role);
}

export const clearStorage = async () => {
    await AsyncStorage.clear();
}

export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
	const ROOT_URL = 'http://192.168.0.10:3000/v1';

	const headers: IHeaders = {
		'Content-Type': 'application/json'
	};

	let token = await getToken();
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	try {
		const res = await fetch(`${ROOT_URL}${uri}`, {
			method,
			headers,
			body: JSON.stringify(body)
		});
		if (res.ok) {
			return <T>await res.json();
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
