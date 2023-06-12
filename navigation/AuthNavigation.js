import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountChoiceScreen from '../screens/AccountChoiceScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function AuthNavigation(props) {
    return (
        <Stack.Navigator initialRouteName='' screenOptions={{headerShown: false}}>
            <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name = "AccountChoiceScreen" component={AccountChoiceScreen}/>
            <Stack.Screen name = "LogInScreen" component={LogInScreen}/>
            <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
        </Stack.Navigator>
    );
}

export default AuthNavigation;