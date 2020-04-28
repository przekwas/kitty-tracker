import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import apiServices from '../utils/api-services';
import type { RootStackParamList } from '../utils/types';

/* Components */
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Button } from 'native-base';

type AddKittyRouteProp = RouteProp<RootStackParamList, 'AddKitty'>;

interface AddKittyProps {
	route: AddKittyRouteProp;
	navigation: StackNavigationProp<RootStackParamList, 'AddKitty'>;
}

const AddKitty: React.FC<AddKittyProps> = ({ route, navigation }) => {
	const [catNickname, setCatNickname] = React.useState('');

	const handleSubmit = React.useCallback(() => {
		(async () => {
			const info = await apiServices('/cats/finds/new', 'POST', {
				userid: 1,
				cat_nickname: catNickname,
				lat: route.params.coords?.latitude,
				lng: route.params.coords?.longitude
			});
			navigation.navigate('Home');
		})();
	}, []);

	return (
		<Container>
			<Content padder>
				<Form>
					<Item rounded>
						<Input
							value={catNickname}
							onChangeText={(text) => setCatNickname(text)}
							placeholder="Kitty Nickname"
						/>
					</Item>
					<Button onPress={handleSubmit} full large primary style={styles.button}>
						<Text>Add that Kitty!</Text>
					</Button>
				</Form>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	button: {
		marginTop: 30
	}
});

export default AddKitty;
