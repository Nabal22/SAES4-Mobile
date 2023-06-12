import React, {useState} from 'react';
import {StyleSheet, Text,Image,SafeAreaView,Alert,ImageBackground, KeyboardAvoidingView } from 'react-native'; 
import {useNavigation} from '@react-navigation/native';

import colors from '../config/colors';
import fonts from '../config/fonts';
import api from '../config/api';
import Input from '../components/Input';
import images from '../config/images';
import BigButton from '../components/BigButton';


function SignUpScreen(props) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [emailTaken, setEmailTaken] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);

    const navigation = useNavigation();

    const checkUsername = async () => {
        try {
            const response = await fetch( api.api_link +'/authentication/username-taken/' + username,
                {
                method: 'GET'
            });
            const json = await response.json();
            if (json["usernameTaken"] == true){
                setUsernameTaken(true);
                Alert.alert("Username error","Username is taken")
            }else
                setUsernameTaken(false);
        } catch (error) {
            console.error(error);
        }
    };

    const checkEmail = async () => {
        try {
            const response = await fetch( api.api_link +'/authentication/email-taken/' + email,
                {
                method: 'GET'
            });
            const json = await response.json();
            if (json["emailTaken"] == true){
                setEmailTaken(true)
                Alert.alert("Email error","Email is taken")
            }else
                setEmailTaken(false)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <ImageBackground 
            source={images.authentication.background} 
            resizeMode="cover" 
            style={styles.imageContainer}>

            <SafeAreaView style={styles.container}>  
                <Text style={styles.title} >Sign Up</Text>
                

                <Image style = {styles.logo} source={images.universal.whiteLogo} />


                <KeyboardAvoidingView style={styles.form} behavior={'position'}>

                    <Input style={usernameTaken ? styles.invalidInput : styles.validInput} icon={images.authentication.user} auto="username" placeholder="Username" function={setUsername} onEndEditing={checkUsername} autoCorrect={false} autoCapitalize='none'/>

                    <Input style={emailTaken ? styles.invalidInput : styles.validInput} icon={images.authentication.email} auto="email" placeholder="Email" function={setEmail} onEndEditing={checkEmail} autoCorrect={false} autoCapitalize='none'/>

                    <Input style={styles.inputSpacing} icon={images.authentication.password} secure={true} auto="new-password" placeholder="Password" function={setPassword} autoCorrect={false} autoCapitalize='none'/>

                    <Input style={styles.inputSpacing} icon={images.authentication.password} secure={true} placeholder="Confirm password" function={setConfPassword} autoCorrect={false} autoCapitalize='none'/>

                    <BigButton style={styles.buttonSpacing} text="Continue" function={()=> {
                        if (email === '' || username === '' || password === '' || confPassword === '')
                            Alert.alert("Invalid fields","All fields are required");
                        if (emailTaken)
                            Alert.alert("Invalid fields","Email is already taken");
                        else if (usernameTaken)
                            Alert.alert("Invalid fields","Username is already taken");
                        else if(password !== confPassword)
                            Alert.alert("Invalid fields","Passwords do not match");
                        else
                            navigation.navigate('AccountChoiceScreen',{username:username,email:email,password:password});
                    }} />

                </KeyboardAvoidingView>

                <Text style={styles.bottom_text}>
                    Already have an account ? <Text style={{textDecorationLine:'underline', fontWeight:'bold'}} onPress={()=> {navigation.navigate('LogInScreen')}}>Log in</Text>
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
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:colors.secondary,
        fontFamily:fonts.main
    },
    logo:{
        marginTop:-50,
        width: 200,
        height: 200
    },
    form:{
        marginTop:-20
    },
    inputSpacing:{
        marginBottom:20
    },
    invalidInput:{
        marginBottom:20,
        borderColor:'red',
        borderWidth:2
    },
    validInput:{
        marginBottom:20,
        borderColor:'none',
        borderWidth:0
    },
    buttonSpacing:{
        marginTop:20
    },
    bottom_text:{
        fontFamily:fonts.main,
        marginBottom:30,
        color:colors.textcol
    },
    
})

export default SignUpScreen;

