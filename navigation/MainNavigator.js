import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { retrieveToken } from '../service/TokenManager';

// Screens
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountChoiceScreen from '../screens/AccountChoiceScreen';
import HomeScreen from '../screens/HomeScreen';
import SondageNavigator from './SondageNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = (props) => {

    useEffect(() => {
        retrieveToken('userToken').then((token) => {
            if (token) {
                props.navigation.navigate('HomeScreen');
            }
        })
        .catch((error) => { console.error(error); });
    }, []);

    return (
        <Stack.Navigator initialRouteName='' screenOptions={{headerShown: false, }}>
            <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name = "AccountChoiceScreen" component={AccountChoiceScreen}/>
            <Stack.Screen name = "LogInScreen" component={LogInScreen}/>
            <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
            <Stack.Screen name = "SondageNavigator" component={SondageNavigator} />
        </Stack.Navigator>
    );
}

export default MainNavigator;