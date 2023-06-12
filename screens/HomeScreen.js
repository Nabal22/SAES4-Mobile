import React, {useState} from 'react';
import {StyleSheet, Text,Image,SafeAreaView,ImageBackground, ScrollView, View,Dimensions } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// garder le bottom navigator pour les sondages
import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; 


function HomeScreen({navigation}) {

    return (
        <ImageBackground 
            source={images.authentication.background}  
            resizeMode="cover" style={styles.imageContainer}>

            <SafeAreaView style={styles.container}>  

                <Text style={styles.title}>Home</Text>
                
                <ScrollView style={styles.scrollView}>

                    <View style={styles.postContainer}>

                        <View >
                            <Image />
                            <Text>description</Text>
                        </View>

                        <Text>description</Text>

                    </View>

                </ScrollView> 

            </SafeAreaView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
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
        marginBottom:15,
        fontSize:25,
        fontWeight:'bold',
        color:colors.secondary,
        fontFamily:fonts.main
    },
    inputSpacing:{
        marginBottom:20
    },
    buttonSpacing:{
        marginTop:20
    },
    bottom_text:{
        fontFamily:fonts.main,
        marginBottom:30,
        color:colors.textcol
    },
    postContainer:{
        width:width,
        backgroundColor:colors.secondary,
        borderRadius:20,
        minHeight:150
    },
    scrollView:{
        width:width,
        flex:1
    }
})

export default HomeScreen;