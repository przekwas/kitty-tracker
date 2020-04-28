import React from 'react';
import apiService, { getToken, setStorage, clearStorage } from '../utils/api-services';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthConext, authReducer } from '../utils/auth-context';
import type { LoginData, RegisterData } from '../utils/types';

/* Components */
import Login from './Login';
import Home from './Home';
import AddKitty from './AddKitty';
import Splash from '../components/Splash';

const Stack = createStackNavigator();

interface RootNavProps {}

const RootNav: React.FC<RootNavProps> = (props) => {
	const [state, dispatch] = React.useReducer(authReducer, {
		isLoading: true,
		isSignout: false,
		userToken: null
	});

	React.useEffect(() => {
		const initialCheck = async () => {
			try {
				let userToken = await getToken();
				dispatch({ type: 'RESTORE_TOKEN', token: userToken });
			} catch (e) {
				throw e;
			}
		};

		initialCheck();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (data: LoginData) => {
				const info = await apiService('/auth/login', 'POST', data);
				await setStorage(info.token, info.role);
				dispatch({ type: 'SIGN_IN', token: info.token });
			},
			signOut: async () => {
				await clearStorage();
				dispatch({ type: 'SIGN_OUT' });
			},
			signUp: async (data: RegisterData) => {
				const info = await apiService('/auth/register', 'POST', data);
				await setStorage(info.token, info.role);
				dispatch({ type: 'SIGN_IN', token: info.token });
			}
		}),
		[]
	);

	if (state.isLoading) {
		return <Splash />;
	}

	return (
		<AuthConext.Provider value={authContext}>
			<NavigationContainer>
				<Stack.Navigator>
					{state.userToken === null ? (
						<Stack.Screen name="Login" component={Login} />
					) : (
						<>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="AddKitty" component={AddKitty} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthConext.Provider>
	);
};

export default RootNav;
