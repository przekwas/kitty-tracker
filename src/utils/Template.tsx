import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import apiServices from '../utils/api-services';
import type { RootStackParamList } from '../utils/types';

/* Components */
import { StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';

interface TemplateProps {
	// navigation: StackNavigationProp<RootStackParamList, ''>;
}

const Template: React.FC<TemplateProps> = (props) => {
	return (
		<Container>
			<Content style={styles.container}>
				<Text>Template Screen</Text>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Template;
