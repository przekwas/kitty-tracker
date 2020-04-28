import React from 'react';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import apiServices from '../utils/api-services';
import type { RootStackParamList, ICat, ICoords } from '../utils/types';

/* Components */
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Button, Icon, Text } from 'native-base';

interface HomeProps {
	navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
	const [coords, setCoords] = React.useState<ICoords | null>(null);
	const [cats, setCats] = React.useState<ICat[] | null>(null);
	const [errorMsg, setErrorMsg] = React.useState<string>('');

	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				const cats = await apiServices('/cats/finds/');
				setCats(cats);
			})();
		}, [])
	);

	React.useEffect(() => {
		(async () => {
			const cats = await apiServices('/cats/finds/');
			setCats(cats);
		})();

		(async () => {
			try {
				let { status } = await Location.requestPermissionsAsync();
				if (status !== 'granted') {
					setErrorMsg('No permission no map :(');
				}

				let { coords } = await Location.getCurrentPositionAsync();
				setCoords(coords);
			} catch (error) {
				console.log(error);
				setErrorMsg('My code sucks.');
			}
		})();
	}, []);

	const locationPress = React.useCallback(() => {
		(async () => {
			let { coords } = await Location.getCurrentPositionAsync();
			setCoords(coords);
		})();
	}, []);

	const addNewKitty = () => navigation.navigate('AddKitty', { coords });


	if (errorMsg) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ color: 'red' }}>{errorMsg}</Text>
			</View>
		);
	}

	return (
		<Container>
			<Content>
				{coords && (
					<MapView
						initialRegion={{
							latitude: coords.latitude,
							longitude: coords.longitude,
							longitudeDelta: 0.005,
							latitudeDelta: 0.005
						}}
						region={{
							latitude: coords.latitude,
							longitude: coords.longitude,
							longitudeDelta: 0.005,
							latitudeDelta: 0.005
						}}
						showsUserLocation={true}
						onPress={(data) => console.log(data)}
						style={styles.mapStyle}>
						{cats?.map((cat) => (
							<Marker
								key={`cat-${cat.cat_nickname}-id-${cat.id}`}
								coordinate={{
									latitude: cat.lat,
									longitude: cat.lng
								}}
								title={cat.cat_nickname}
							/>
						))}
					</MapView>
				)}
				<Button
					onPress={addNewKitty}
					rounded
					style={[styles.button, styles.buttonAdd]}>
					<Icon name="add" />
				</Button>
				<Button
					onPress={locationPress}
					rounded
					style={[styles.button, styles.buttonFind]}>
					<Icon name="locate" />
				</Button>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 20
	},
	button: {
		position: 'absolute',
		opacity: 0.75
	},
	buttonAdd: {
		left: '2%',
		top: '85%'
	},
	buttonFind: {
		right: '2%',
		top: '85%'
	}
});

export default Home;
