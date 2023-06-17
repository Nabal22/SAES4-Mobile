import React, {useState, useEffect} from 'react';
import {StyleSheet, Text,Image,SafeAreaView,Alert,ImageBackground,KeyboardAvoidingView } from 'react-native'; 
import BigButton from '../components/BigButton';
import Input from '../components/Input';

import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';
import api from '../config/api';
import { saveToken } from '../service/TokenManager.js';
import login from '../service/Login.js';


function LogInScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        login(email, password, navigation)
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <ImageBackground 
            source={images.authentication.background}  
            resizeMode="cover" style={styles.imageContainer}>

            <SafeAreaView style={styles.container}>  
                <Text style={styles.title} >Welcome Back</Text>
                
                
                <Image style = {styles.logo} source={images.universal.whiteLogo} />


                <KeyboardAvoidingView style={styles.form} behavior={'position'}>

                    <Input style={styles.inputSpacing} icon={images.authentication.user} auto="email" placeholder="Email" function={setEmail} autoCorrect={false} autoCapitalize="none" textContentType="alban2@gmail.com"/>

                    <Input style={styles.inputSpacing} icon={images.authentication.password} secure={true} auto="password" placeholder="Password" function={setPassword} autoCorrect={false} autoCapitalize='none' textContentType="Mdp12345678"/>

                    <BigButton style={styles.buttonSpacing} text="Log In" function={handleLogin} />
                
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