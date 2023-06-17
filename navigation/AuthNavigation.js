import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { retrieveToken } from '../service/TokenManager';

// Screens
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountChoiceScreen from '../screens/AccountChoiceScreen';
import HomeScreen from '../screens/HomeScreen';
import SondageScreen from '../screens/SondageScreen';

const Stack = createNativeStackNavigator();

function AuthNavigation(props) {

    useEffect(() => {
        retrieveToken('userToken').then((token) => {
            if (token) {
                props.navigation.navigate('HomeScreen');
            }
        })
        .catch((error) => { console.error(error); });
    }, []);

    return (
        <Stack.Navigator initialRouteName='' screenOptions={{headerShown: false}}>
            <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name = "AccountChoiceScreen" component={AccountChoiceScreen}/>
            <Stack.Screen name = "LogInScreen" component={LogInScreen}/>
            <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
            <Stack.Screen name = "SondageScreen" component={SondageScreen}/>
        </Stack.Navigator>
    );
}

export default AuthNavigation;