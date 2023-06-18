// SondageSurvey.jssondages
import React from 'react';
import {StyleSheet, SafeAreaView,ImageBackground, Dimensions } from 'react-native';

// garder le bottom navigator pour les sondages
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import images from '../../config/images.js';
import Header from '../../components/Header.js';

import api from '../../config/api.js';
const width = Dimensions.get('window').width;

function SondageResultScreen({ route }) {
    const { id, nom, nbQuestion, navigation } = route.params;

    
  return (
    <ImageBackground 
    source={images.authentication.background}  
    resizeMode="cover" style={styles.imageContainer}>
        

    <SafeAreaView style={styles.container}>  
        <Header title={'Résutats'}  style={styles.header} navigation={navigation}  />

        

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
        padding : 5,
        margin : 10,
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
        borderRadius:20,
        minHeight:150,
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'column'
    },
    scrollView:{
        width:width,
        flex:1
    }
})

export default SondageResultScreen;
