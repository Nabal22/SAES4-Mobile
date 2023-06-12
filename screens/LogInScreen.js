import React, {useState} from 'react';
import {StyleSheet, Text,Image,SafeAreaView,Alert,ImageBackground,KeyboardAvoidingView } from 'react-native'; 
import BigButton from '../components/BigButton';
import Input from '../components/Input';

import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';
import api from '../config/api';


function LogInScreen({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await fetch( api.api_link +'/authentication/authenticate',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password" : password
                })
            });
            const json = await response.json();
            // navigation.replace('HomeScreen');
            if ("token" in json){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                });
            }else{
                Alert.alert("Authentication error",json["error"])
            }
            // Alert.alert("Login","Success")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ImageBackground 
            source={images.authentication.background}  
            resizeMode="cover" style={styles.imageContainer}>

            <SafeAreaView style={styles.container}>  
                <Text style={styles.title} >Welcome Back</Text>
                
                
                <Image style = {styles.logo} source={images.universal.whiteLogo} />


                <KeyboardAvoidingView style={styles.form} behavior={'position'}>

                    <Input style={styles.inputSpacing} icon={images.authentication.user} auto="username" placeholder="Username" function={setUsername} autoCorrect={false} autoCapitalize='none'/>

                    <Input style={styles.inputSpacing} icon={images.authentication.password} secure={true} auto="password" placeholder="Password" function={setPassword} autoCorrect={false} autoCapitalize='none'/>

                    <BigButton style={styles.buttonSpacing} text="Log In" function={()=> {login()}} />
                
                </KeyboardAvoidingView>

                <Text style={styles.bottom_text}>
                    Don't have an account yet ? <Text style={{textDecorationLine:'underline', fontWeight:'bold'}} onPress={()=> {navigation.navigate('SignUpScreen')}}>Sign Up</Text>
                </Text>

            </SafeAreaView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'column'
    },
    imageContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:colors.primary
    },
    logo:{
        marginTop:-50,
        width: 200,
        height: 200
    },
    form:{
        marginTop:-20
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:colors.secondary,
        fontFamily:fonts.main
    },inputSpacing:{
        marginBottom:20
    },
    buttonSpacing:{
        marginTop:20
    },
    bottom_text:{
        fontFamily:fonts.main,
        marginBottom:30,
        color:colors.textcol
    }
})

export default LogInScreen;