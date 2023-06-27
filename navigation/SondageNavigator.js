import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { retrieveToken } from '../service/TokenManager';

import colors from '../config/colors';
import api from '../config/api';

import SondageSurveyScreen from '../screens/Sondage/SondageSurveyScreen';
import SondageResultScreen from '../screens/Sondage/SondageResultScreen';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const SondageNavigator = ({ navigation }) => {
  const route = useRoute();
  const { id, nom, nbQuestion, aRepondu } = route.params;

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = api.api_link + '/api/sondage/get-question-of-sondage/' + id;
    retrieveToken('userToken').then((token) => {
      setIsLoading(true); // Définir isLoading sur true avant la requête API
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setQuestions(data);
        })
        .catch(error => console.error(error))
        .finally(() => {
          setIsLoading(false); // Définir isLoading sur false une fois que les questions sont chargées
        });
    });
  }, []);

  if (isLoading) {
    // Afficher un indicateur de chargement ou un écran de chargement
    return <ActivityIndicator />;
  }

  const defaultScreen = aRepondu ? 'SondageResultScreen' : 'SondageSurveyScreen';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: 'transparent',
          margin: 20,
          marginTop : 5,
          backgroundColor: colors.tertiary,
          borderRadius: 15,
          elevation: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.8,
          shadowRadius: 8,
          height: 70,
        },
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: colors.primary,
      }}
      initialRouteName={defaultScreen}
    >
      <Tab.Screen
        name="SondageSurveyScreen"
        component={SondageSurveyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: 'Répondre',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarAccessibilityLabel: aRepondu ? '' : 'Répondre', // Masquer le libellé de l'onglet si aRepondu est vrai
        }}
        initialParams={{ id: id, nom: nom, nbQuestion: nbQuestion, aRepondu: aRepondu, questions: questions }}
      />
      <Tab.Screen
        name="SondageResultScreen"
        component={SondageResultScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-pie"
              color={color}
              size={26}
            />
          ),
          tabBarLabel: 'Resultats',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
        }}
        initialParams={{ id: id, nom: nom, nbQuestion: nbQuestion, aRepondu: aRepondu, questions: questions }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabBarIconStyle: {
    paddingTop: 5,
    width: 20,
    height: 20,
  },
});

export default SondageNavigator;
