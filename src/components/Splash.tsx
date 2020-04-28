import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface SplashProps {}

const Splash: React.FC<SplashProps> = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Cat Tracker</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 50
	}
});

export default Splash;
