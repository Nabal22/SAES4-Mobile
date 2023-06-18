import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

import colors from '../config/colors';
import images from '../config/images';
import SondageSurveyScreen from '../screens/Sondage/SondageSurveyScreen';
import SondageResultScreen from '../screens/Sondage/SondageResultScreen';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

const SondageNavigator = ({navigation}) => {
  const route = useRoute();
  const { id, nom, nbQuestion, aRepondu } = route.params;

  return (
    
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopColor : 'transparent',
            margin: 20,
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
            tabBarLabel: 'Survey',
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIconStyle: styles.tabBarIconStyle,
          }}
          initialParams={{ id: id, nom: nom, nbQuestion: nbQuestion, aRepondu: aRepondu, navigation: navigation }}

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
            tabBarLabel: 'Result',
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIconStyle: styles.tabBarIconStyle,
          }}
          initialParams={{ id: id, nom: nom, nbQuestion: nbQuestion, aRepondu: aRepondu, navigation: navigation }}
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
