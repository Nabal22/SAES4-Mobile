import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, Alert } from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';

function SondagePressable(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [iconIsPressed, setIconIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleIconPressIn = () => {
    setIconIsPressed(true);
  };

  const handleIconPressOut = () => {
    setIconIsPressed(false);
  };

  const handlePress = () => {
    props.navigation.navigate('SondageNavigator', {
      id: props.id,
      nom: props.nom,
      nbQuestion: props.nbQuestion,
      aRepondu: props.aRepondu,
    });
  };

  const handleIconPress = (aRepondu) => {
    if (aRepondu) {
      Alert.alert('Vous avez déjà répondu à ce sondage');
    } else {
      Alert.alert('Vous n\'avez pas encore répondu à ce sondage');
    }
  };

  return (
    <Pressable
      style={[
        styles.button,
        props.style,
        isPressed && styles.buttonPressed,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.button_title}>{props.nom}</Text>
      <Text style={styles.button_text}>{props.nbQuestion} Questions</Text>
      
      <Pressable
        style={[
          styles.button_icon_container,
          props.style,
          iconIsPressed && styles.button_icon_container_pressed,
        ]}
        onPress={() => handleIconPress(props.aRepondu)}
        onPressIn={handleIconPressIn}
        onPressOut={handleIconPressOut}
      >
        {props.aRepondu ? (
          <Text style={styles.button_icon}>✅</Text>
        ) : (
          <Text style={styles.button_icon}>❓</Text>
        )}
      </Pressable>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.tertiary,
    padding: 20,
    margin: 10,
    position: 'relative',
  },
  button_title: {
    fontSize: 22,
    fontFamily: fonts.main,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  button_text: {
    color: colors.secondary,
    fontSize: 18,
    fontFamily: fonts.main,
    fontWeight: 'bold',
  },
  button_icon_container: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.quaternary,
    padding: 10,
    borderRadius: 30,
    borderColor: colors.quaternary_pressed,
    borderWidth: 2,
  },
  button_icon: {
    fontSize: 14,
  },
  button_icon_container_pressed: {
    backgroundColor: colors.quaternary_pressed,
  },
  buttonPressed: {
    backgroundColor: colors.tertiary_pressed,
  },
});

export default SondagePressable;