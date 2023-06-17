import React from 'react';
import {StyleSheet, SafeAreaView,ImageBackground, ScrollView, View, Dimensions, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import colors from '../config/colors';
import images from '../config/images';
import Header from '../components/Header';
import fonts from '../config/fonts';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height; 

function SondageScreen({ navigation }) {
    const route = useRoute();
    const idSondage = parseInt(route.params.id);
    const nom = route.params.nom;
    const nbQuestion = route.params.nbQuestion;
    const aRepondu = route.params.aRepondu;

    return (
        <ImageBackground 
            source={images.authentication.background}  
            resizeMode="cover" style={styles.imageContainer}>
                
            <SafeAreaView style={styles.container}>  

                <Header title={'Sondage Numéro '+ idSondage }  style={styles.header} navigation={navigation}  />

                <ScrollView style={styles.scrollView}>

                    <View style={styles.postContainer}>

                        <Text style={styles.title}>{nom}</Text>
                        <Text style={styles.title}>Nombre de questions : {nbQuestion}</Text>
                        <Text style={styles.title}>A répondu : {aRepondu}</Text>

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
export default SondageScreen;
