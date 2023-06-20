import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView,ImageBackground, ScrollView, View,Dimensions, ActivityIndicator } from 'react-native';
import { retrieveToken } from '../service/TokenManager.js';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// garder le bottom navigator pour les sondages
import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';
import SondagePressable from '../components/SondagePressable';
import Header from '../components/Header.js';

import api from '../config/api.js';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height; 

function HomeScreen({ navigation }) {
    const route = useRoute();
    const params = route.params;
    
    const [sondageList, setSondageList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchSondageList = () => {
        setIsLoading(true);
        const url = api.api_link + '/api/sondage/get-all';
        retrieveToken('userToken')
        .then((token) => {
            fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
                setSondageList(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
        })
        .catch((error) => {
            console.error(error);
        });
    };
  
    useEffect(() => {
      fetchSondageList();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchSondageList();
        }, [])
    );
  
    return (
      <ImageBackground
        source={images.authentication.background}
        resizeMode="cover"
        style={styles.imageContainer}
      >
        <SafeAreaView style={styles.container}>
          <Header title={'Vos Sondages'} style={styles.header} navigation={navigation} />
  
          <ScrollView style={styles.scrollView}>
            <View style={styles.postContainer}>
              {isLoading ? (
                <ActivityIndicator /> // Affichez un indicateur de chargement pendant que les données sont récupérées.
              ) : (
                sondageList.map((sondage) => (
                  <SondagePressable
                    key={sondage.id}
                    id={sondage.id}
                    nom={sondage.nom}
                    aRepondu={sondage.aRepondu}
                    nbQuestion={sondage.nbQuestion}
                    navigation={navigation}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  
  // Le reste du code reste inchangé
  
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

export default HomeScreen;