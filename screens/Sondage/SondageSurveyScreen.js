// SondageSurvey.jssondages
import React, {useState, useContext} from 'react';
import {StyleSheet, SafeAreaView,ImageBackground, ScrollView, View, Dimensions , Text} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// garder le bottom navigator pour les sondages
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import images from '../../config/images.js';
import Header from '../../components/Header.js';

const width = Dimensions.get('window').width;

function SondageSurveyScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id, nom, nbQuestion, questions } = route.params;
  
  return (
    <ImageBackground 
    source={images.authentication.background}  
    resizeMode="cover" style={styles.imageContainer}>
        

    <SafeAreaView style={styles.container}>  
        <Header title={'Réponde au sondage'}  style={styles.header} navigation={navigation}/>

        <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        >
            <View style={styles.postContainer}>
                <Text style={styles.title}>{nom}</Text>
                <Text style={styles.title}>{nbQuestion}</Text>
            </View>

            <View >
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

export default SondageSurveyScreen;
