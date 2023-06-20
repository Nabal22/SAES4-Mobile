import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, ScrollView, View, Dimensions, Text, Button, ActivityIndicator, FlatList} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { retrieveToken } from '../../service/TokenManager';

import MultiSelect from 'react-native-multiple-select';

import QuestionComponent from '../../components/QuestionComponent.js';

import colors from '../../config/colors';
import fonts from '../../config/fonts';
import images from '../../config/images.js';
import Header from '../../components/Header.js';
import api from '../../config/api.js';

const width = Dimensions.get('window').width;

function SondageSurveyScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, nom, nbQuestion, questions } = route.params;
  const [loading, setLoading] = useState(true); // Ajout de l'état loading

  let tmpRepData = {};
  questions.map((question) => {
    tmpRepData[question.id] = [];
  });

  const [reponsePossible, setReponsePossible] = useState(tmpRepData);
  const [reponses, setReponses] = useState({});

    useEffect(() => {
        retrieveToken('userToken').then((token) => {
        const fetchReponses = questions.map((question) => {
            return fetch(api.api_link + '/api/reponse-question/' + question.id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => response.json())
            .then((json) => {
                let tmp = reponsePossible;
                tmp[question.id] = json;
                setReponsePossible(tmp);
            })
            .catch((error) => console.error(error));
        });

        Promise.all(fetchReponses) // Attendre que toutes les requêtes soient terminées
            .then(() =>setLoading(false)) // Mettre à jour l'état loading à false
            .catch((error) => console.error(error));
        })
    }, []);

    const onSelectedItemsChange = (questionId, selectedItems) => {
        let tmp = reponses;
        tmp[questionId] = selectedItems;
        setReponses(tmp);
    };

  const submitSurvey = () => {
    // convert value of reponses to string
    for (const [key, value] of Object.entries(reponses)) {
        let tmp = [];
        value.forEach((element) => {
            tmp.push(element.toString());
        });
        reponses[key] = tmp;
    }

    const submitJson = {
        "idSondage": id,
        "reponses": reponses
    }
    console.log(submitJson);
  }

    return (
        <ImageBackground source={images.authentication.background} resizeMode="cover" style={styles.imageContainer}>
          <SafeAreaView style={styles.container}>
            <Header title={'Réponde au sondage'} style={styles.header} navigation={navigation} />
    
            <View style={styles.postContainer}>
                <Text style={styles.title}>{nom}</Text>
    
                {loading ? ( // Afficher l'indicateur de chargement si loading est true
                  <ActivityIndicator size="large" color={colors.secondary} />
                ) : (
                  <FlatList
                    data={questions}
                    renderItem={({ item }) => (
                        
                      <QuestionComponent
                        key={item.id}
                        question={item}
                        reponsePossible={reponsePossible[item.id]}
                        onSelectedItemsChange={onSelectedItemsChange}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.scrollView}
                  />
                )}
    
                <Button
                  title="Valider"
                  onPress={() => submitSurvey()}
                />
            </View>
          </SafeAreaView>
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  title: {
    padding: 5,
    margin: 10,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
  },
  postContainer: {
    width: width,
    borderRadius: 20,
    minHeight: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  scrollView: {
    width: width,
    flex: 1,
  },
  multiSelectContainer: {

  },
  multiSelectStyle: {
    width: width,
    flex: 1,
  },

});

export default SondageSurveyScreen;
