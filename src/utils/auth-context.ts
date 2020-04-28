import React from 'react';
import type { State, Action, RegisterData, LoginData } from './types';

export const AuthConext = React.createContext({
	signIn: async (data: LoginData) => {},
	signOut: async () => {},
	signUp: async (data: RegisterData) => {}
});

export const authReducer = (prevState: State, action: Action) => {
	switch (action.type) {
		case 'RESTORE_TOKEN':
			return {
				...prevState,
				userToken: action.token,
				isLoading: false
			};
		case 'SIGN_IN':
			return {
				...prevState,
				isSignout: false,
				userToken: action.token
			};
		case 'SIGN_OUT':
			return {
				...prevState,
				isSignout: true,
				userToken: null
			};
		default:
			return prevState;
	}
};
