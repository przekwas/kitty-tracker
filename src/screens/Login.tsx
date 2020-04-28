import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthConext } from '../utils/auth-context';
import type { RootStackParamList } from '../utils/types';

/* Components */
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

interface LoginProps {
	navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login: React.FC<LoginProps> = (props) => {
	const { signIn } = React.useContext(AuthConext);

	const [email, setEmail] = React.useState('guest@test.com');
	const [password, setPassword] = React.useState('password123');

	return (
		<Container>
			<Content>
				<Form style={styles.form}>
					<Item>
						<Input
							value={email}
							onChangeText={(text) => setEmail(text)}
							placeholder="Email"
						/>
					</Item>
					<Item>
						<Input
							value={password}
							onChangeText={(text) => setPassword(text)}
							placeholder="Password"
							secureTextEntry
						/>
					</Item>
					<Button
						onPress={() => signIn({ email, password })}
						full
						large
						primary
						style={styles.button}>
						<Text>Login</Text>
					</Button>
				</Form>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	form: {
		marginRight: 10
	},
	button: {
		marginTop: 30,
		marginLeft: 10
	}
});

export default Login;
