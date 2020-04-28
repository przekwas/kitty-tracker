import React from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import RootNav from './src/screens/RootNav';
import Splash from './src/components/Splash';

export default function App() {
	const [isReady, setReady] = React.useState<boolean>(false);

	React.useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				Roboto: require('native-base/Fonts/Roboto.ttf'),
				Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
				...Ionicons.font
			});
			setReady(true);
		};
		loadFonts();
	}, []);

	if (!isReady) return <Splash />;
	else return <RootNav />;
}