import { saveToken } from '../service/TokenManager.js';
import { Alert } from 'react-native';
import api from '../config/api.js';

export default async function login(email, password, navigation) {
    try {
        const response = await fetch(api.api_link+'/authentification/authentifier',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password" : password
            })
        });
        const json = await response.json();
        if ("token" in json){
            saveToken('userToken',json["token"]).then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                });
            }).catch((error) => { console.error(error); });
        }else{
            Alert.alert("Authentication error",json["error"])
        }
        // Alert.alert("Login","Success")
    } catch (error) {
        console.error(error);
    }
};