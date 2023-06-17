import React, {useState} from 'react';

import {Pressable,StyleSheet,Text} from 'react-native'; 
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
    props.navigation.navigate('SondageScreen', {id: props.id , nom: props.nom, nbQuestion: props.nbQuestion, aRepondu: props.aRepondu});
  };

    return (
      <Pressable 
        style={[styles.button, props.style, isPressed && styles.buttonPressed]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.button_title}>{props.nom}</Text>
        <Text style={styles.button_text}>{props.nbQuestion} Questions</Text>
        <Pressable 
        style={[styles.button_icon_container, props.style, iconIsPressed && styles.button_icon_container_pressed]}
        onPress={props.function}
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
  

export default SondagePressable;

const styles = StyleSheet.create({
  button:{
    width : 300,
    minHeight : 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    backgroundColor:colors.tertiary,
    padding : 20,
    margin: 10,
    position : 'relative',
    elevation: 4, // Niveau d'élévation de l'ombre portée
    shadowColor: 'black', // Couleur de l'ombre portée
    shadowOffset: { width: 2, height: 2 }, // Décalage horizontal et vertical de l'ombre portée
    shadowOpacity: 0.4, // Opacité de l'ombre portée
    shadowRadius: 7, // Rayon de l'ombre portée
  },
  button_title:{
    fontSize:22,
    fontFamily:fonts.main,
    color:colors.secondary,
    fontWeight:'bold'
  },
  button_text:{
    color:colors.secondary,
    fontSize:18,
    fontFamily:fonts.main,
    fontWeight:'bold'
  },
  button_icon_container : {
    position : 'absolute',
    top : 10,
    right : 10,
    backgroundColor:colors.quaternary,
    padding : 10,
    borderRadius: 30,
    borderColor : colors.quaternary_pressed,
    borderWidth : 2
  },
  button_icon : {
    fontSize : 14
  },
  button_icon_container_pressed : {
    backgroundColor:colors.quaternary_pressed,
  },
  buttonPressed: {
    backgroundColor: colors.tertiary_pressed,
  },
})