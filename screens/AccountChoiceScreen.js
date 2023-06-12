import React,{useState} from 'react';
import {Text,StyleSheet,SafeAreaView, View, Pressable, ImageBackground,Image,Alert} from 'react-native';
import BigButton from '../components/BigButton';
import { useRoute } from "@react-navigation/native"

import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';
import api from '../config/api';

function AccountChoiceScreen({navigation}) {

    const route = useRoute();

    const [choice, setChoice] = useState('');

    const signUp = async () => {
        try {
            const response = await fetch(api.api_link + '/authentication/register',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": route.params.username,
                    "email" : route.params.email,
                    "firstName" : "first",
                    "lastName" : "last",
                    "password" : route.params.password,
                    "accountType" : choice
                })
            });
            const json = await response.json();
            if ("token" in json){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                });
            }else{
                Alert.alert("Authentication error",json["error"])
            }
            // Alert.alert("Creation success","Success")
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <ImageBackground resizeMode="cover" source={images.authentication.accountChoiceBackground} style={{flex:1}}>

            <SafeAreaView style={styles.container}>

                <Pressable style={styles.backButton} onPress={() => {navigation.goBack()}}>
                    <Image style={{flex:1}} source={images.universal.backArrow}/>
                </Pressable>

                <Text style={styles.title}>What is your goal?</Text>

                <View>

                    <View style={styles.box}>

                        <Pressable 
                            style={choice === "Listener" ? styles.cardSelected : styles.card} 
                            onPress={() => {choice === "Listener" ? setChoice('') : setChoice("Listener")}} >
                            <Image source={images.authentication.accountChoice.standard} style={styles.cardIcon} />
                            <Text style={styles.cardTitle}>Listener</Text>
                            <Text style={styles.cardDescription}>Discover new music and stay up to date with your favorite artists.</Text>
                        </Pressable>
                        
                        <Pressable  
                            style={choice === "Artist" ? styles.cardSelected : styles.card} 
                            onPress={() => {choice === "Artist" ? setChoice('') : setChoice("Artist")}} >
                            <Image source={images.authentication.accountChoice.artist} style={styles.cardIcon} />
                            <Text style={styles.cardTitle}>Artist</Text>
                            <Text style={styles.cardDescription}>Share your music and connect with your listeners.</Text>
                        </Pressable>

                    </View>

                    <View  style={styles.box}>

                        <Pressable 
                            style={choice === "Label" ? styles.cardSelected : styles.card} 
                            onPress={() => {choice === "Label" ? setChoice('') : setChoice("Label")}}>
                            <Image source={images.authentication.accountChoice.label} style={styles.cardIcon} />
                            <Text style={styles.cardTitle}>Label</Text>
                            <Text style={styles.cardDescription}>Promote your artists and events.</Text>
                        </Pressable>

                        <Pressable  
                            style={choice === "Venue" ? styles.cardSelected : styles.card} 
                            onPress={() => {choice === "Venue" ? setChoice('') : setChoice("Venue")}}>
                            <Image source={images.authentication.accountChoice.venue} style={styles.cardIcon} />
                            <Text style={styles.cardTitle}>Venue</Text>
                            <Text style={styles.cardDescription}>Share your events and reach your target audience.</Text>
                        </Pressable>

                    </View>

                </View>

                <BigButton style={styles.buttonSpacing} 
                    text="Continue" 
                    function={()=> {
                        if (choice === ''){
                            Alert.alert("Account Choice","Please select a type of account")
                        }else 
                            signUp()
                        }
                    }
                />

            </SafeAreaView>

        </ImageBackground>
    );
}

export default AccountChoiceScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'column',
    },
    backButton:{
        position:'absolute',
        top:40,
        left:10,
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:colors.secondary,
        fontFamily:fonts.main
    },
    box:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    card:{
        backgroundColor:colors.secondary,
        width:150,
        height:200,
        borderRadius:20,
        alignItems:'center',
        margin:10,
        padding:10,
        justifyContent:'space-evenly'
    },
    cardSelected:{
        backgroundColor:colors.tertiary,
        width:150,
        height:200,
        borderRadius:20,
        alignItems:'center',
        margin:10,
        padding:10,
        justifyContent:'space-evenly',
        color:colors.secondary
    },
    cardTitle:{
        fontWeight:'bold',
        fontFamily:fonts.main,
        fontSize:20
    },
    cardDescription:{
        fontFamily:fonts.main,
        textAlign:'center'
    },
    cardIcon:{
        width:60,
        height:60
    },
    buttonSpacing:{
        marginBottom:30
    }
})