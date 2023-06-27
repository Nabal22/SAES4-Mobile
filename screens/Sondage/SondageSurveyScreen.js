import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, View, Dimensions, Text, ActivityIndicator, FlatList, Pressable} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { retrieveToken } from '../../service/TokenManager';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {use } from '@react-navigation/native-stack';


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
  const { id, nom, nbQuestion, questions, aRepondu } = route.params;
  const [aReponduState, setAReponduState] = useState(aRepondu);

  const [loading, setLoading] = useState(true); // Ajout de l'état loading
  const [isSending, setIsSending] = useState(false); // Ajout de l'état isSending
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

    const checkIfQuesionIsAnswered = (question, reponse) => {  
      return reponse.length >= question.nbReponseMin && reponse.length <= question.nbReponseMax;
    };

    const checkIfAllQuestionsAreAnswered = () => {
      let isAnswered = true;
      let contenuNotAnswered = null;
      // check reponses is defined
      questions.forEach((question) => {
        if (reponses[question.id] === undefined) {
          return { isAnswered: false, contenuNotAnswered: null };
        }
        if (!checkIfQuesionIsAnswered(question, reponses[question.id])) {
          isAnswered = false;
          contenuNotAnswered = question.contenu;
        }
      });
      return { isAnswered, contenuNotAnswered };
    };

  const submitSurvey = () => {
    setIsSending(true);
    // check if all questions are answered
    const { isAnswered, contenuNotAnswered } = checkIfAllQuestionsAreAnswered();
    if (!isAnswered) {
      setIsSending(false);
      alert(`Vous n'avez pas répondu à la question suivante : ${contenuNotAnswered}`);
    }
    else {
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
      };

      // fetch response to /api/sondage/repondre
      retrieveToken('userToken').then((token) => {
        fetch(api.api_link + '/api/sondage/repondre', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submitJson)
        })
        .then((response) => {
          if (response.status === 200) {
            // Aucune réponse de la part de l'API, l'envoie a fonctionné
            setIsSending(false);
            setAReponduState(true);
            navigation.navigate('SondageResultScreen', { id, nom, nbQuestion, questions, aRepondu: true });
          } else {
            return response.json();
          }
        })
        .then((json) => {
          if (json && json.error) {
            setIsSending(false);
            alert(json.error);
          }
        })
        .catch((error) => {
          console.log('error:', error);
        });
      });
      
    }
  }

  // Button submit
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    submitSurvey();
  };

    return (
        <ImageBackground source={images.authentication.background} resizeMode="cover" style={styles.imageContainer}>
          <SafeAreaView style={styles.container}>
            <Header title={nom} style={styles.header} navigation={navigation} />
    
            <View style={styles.postContainer}>

              {aReponduState ? ( // Si aRepondu est true, afficher le texte d'information
                <View style={styles.alreadyAnsweredContainer}>
                  <Text style={styles.alreadyAnsweredText}>Vous avez déjà répondu à ce sondage.</Text>
                  <MaterialCommunityIcons name="check" size={24} color={colors.quaternary} />
                </View>
              ) : loading ? ( // Sinon, afficher l'indicateur de chargement si loading est true
                <ActivityIndicator size="large" color={colors.secondary} />
              ) : (
                <FlatList
                  data={questions}
                  renderItem={({ item }) => {
                      return (
                        <QuestionComponent
                          key={item.id}
                          question={item}
                          reponsePossible={reponsePossible[item.id]}
                          onSelectedItemsChange={onSelectedItemsChange}
                          style={styles.questionContainer}
                        />
                      );
                    }}
                  keyExtractor={(item) => item.id}
                  style={styles.scrollView}
                />
              )}
            {!aReponduState && ( // Ajoutez cette condition pour ne rendre le bouton que lorsque aReponduState est false
              <View style={styles.SubmitButtonContainer2}>
                <Pressable
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handlePress}
                  style={[
                    styles.SubmitButton,
                    isPressed && styles.SubmitButtonPressed,
                  ]}
                  color={colors.quaternary}
                >
                  <Text style={styles.SubmitButtonText}>Envoyer</Text>

                  {isSending ? (
                    <ActivityIndicator size="small" color={colors.secondary} />
                  ) : (
                    <MaterialCommunityIcons name="send" size={24} color={colors.secondary} />
                  )}
                </Pressable>
              </View>
            )}
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
  },
  postContainer: {
    width: width,
    borderRadius: 20,
    minHeight: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
  },
  scrollView: {
    width: width,
    flex: 1,
  },
  multiSelectStyle: {
    width: width,
    flex: 1,
  },
  
  SubmitButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    padding: 10,
    margin: 5,
  },
  SubmitButtonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    padding: 5,
    margin: 5,
    marginBottom : -20,
  },
  SubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.quaternary,
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
        width: 5,
        height: 5,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    },
  },
  SubmitButtonPressed: {
    backgroundColor: colors.quaternary_pressed,
  },
  SubmitButtonText: {
    paddingRight: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
  },
  alreadyAnsweredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: colors.tertiary,
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
        width: 5,
        height: 5,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    },
  },
  alreadyAnsweredText: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
  },
  questionContainer :{
    maxHeight : 400,
  }
});

export default SondageSurveyScreen;
