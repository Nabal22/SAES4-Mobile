import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import fonts from '../config/fonts';

function QuestionComponent(props) {
  const { question, reponsePossible } = props;
  const nbReponseMin = question.nbReponseMin;
  const nbReponseMax = question.nbReponseMax;
  const [selectedItems, setSelectedItems] = useState([]);

  const [iconIsPressed, setIconIsPressed] = useState(false);

  const handleIconPressIn = () => {
    setIconIsPressed(true);
  };

  const handleIconPressOut = () => {
    setIconIsPressed(false);
  };

  const getValidIndicatorText = () => {
    if (question.type === 'TEXTE') {
      return 'Vous devez saisir une réponse';
    }
    else if (question.type === 'CHECKBOX') {
      return 'Vous devez sélectionner une réponse';
    }
    else {
      return 'Vous devez sélectionner de ' + nbReponseMin + ' à ' + nbReponseMax + ' réponses';
    }
  };
    
  const handleIconPress = () => {
    if (!reponseIsValide()) {
      Alert.alert(getValidIndicatorText());
    }
  };

  const reponseIsValide = () => {
    if (question.type === 'TEXTE') {
      return selectedItems.length === 1;
    }
    else{
      return selectedItems.length >= nbReponseMin && selectedItems.length <= nbReponseMax;
    }
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    props.onSelectedItemsChange(question.id, selectedItems);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <View style={[styles.questionContainer, props.style]}>
        <View style={styles.questionHeader}>
          <Text style={styles.title}>{question.contenu}</Text>
          <View style={styles.icon_container}>
            <MaterialCommunityIcons
              name={reponseIsValide() ? 'check-circle' : 'alert-circle'}
              size={24}
              color={reponseIsValide() ? colors.quaternary : colors.quaternary_pressed}
              onPress={handleIconPress} // Appel de la fonction sans les parenthèses
              onPressIn={handleIconPressIn}
              onPressOut={handleIconPressOut}
            />
          </View>
        </View>
        <View style={styles.questionBody}>
        {question.type === 'TEXTE' && (
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onSelectedItemsChange([text])}
            value={selectedItems[0]}
          />
        )}
        {(question.type === 'CHECKBOX' || question.type === 'LIST') && (
          <MultiSelect
            items={reponsePossible}
            uniqueKey='id'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText={question.type === 'CHECKBOX' ? "Choisissez une réponse" : "Choissisez de " + nbReponseMin + " à " + nbReponseMax + " réponses"}
            searchInputPlaceholderText={question.type === 'CHECKBOX' ? "Rechercher une réponse" : "Rechercher des réponses..."}
            tagRemoveIconColor={colors.tertiary}
            tagBorderColor={colors.tertiary_pressed}
            tagTextColor={colors.tertiary_pressed}
            tagContainerStyle={styles.tagStyle}
            
            selectedItemTextColor={colors.quaternary_pressed}
            selectedItemIconColor={colors.quaternary_pressed}
            itemTextColor={colors.secondary}
            displayKey="reponse"
            searchInputStyle={styles.searchInput}
            styleInputGroup={styles.inputGroup}
            styleMainWrapper={styles.MultiSelect}
            submitButtonColor={colors.primary}
            submitButtonText="Valider"
            single={question.type === 'CHECKBOX'}
            multiple={question.type === 'LIST'}

            styleTextDropdownSelected = {styles.test}
            styleTextDropdown = {styles.test}
            styleDropdownMenu = {styles.test}
            styleDropdownMenuSubsection = {styles.test}

            styleSelectorContainer = {styles.dropdownSelectorContainer}
            styleItemsContainer = {styles.dropdownSelectorContainer}
            styleListContainer = {styles.dropdownSelectorContainer}
          />
        )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    margin: 10,
    padding: 20,
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
  questionHeader: {
    position : 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionBody: {
    marginTop: 10,
  },
  title: {
    maxWidth : 280,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.main,
  },
  icon_container: {
    position : 'absolute',
    top : 0,
    right : 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: fonts.primary,
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: colors.quaternary_pressed,
    backgroundColor: colors.quaternary,
    color: colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    height: 40,
    padding: 10,
    borderColor: colors.quaternary_pressed,
    borderWidth: 2,
    borderRadius: 10,
    color: colors.secondary,
  },
  inputGroup: {
    borderColor: colors.quaternary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: colors.quaternary,
  },
  MultiSelect: {
    backgroundColor: colors.quaternary,
    borderColor: colors.quaternary_pressed,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    maxHeight : 270,
  },
  test : {
    backgroundColor: colors.quaternary,
  },
  styleTextDropdownSelected: {
    maxWidth: 200, // ou toute autre largeur souhaitée
    overflow: 'hidden', // pour masquer le texte dépassant de la largeur spécifiée
    backgroundColor: colors.quaternary,
  },
  tagStyle : {
    maxWidth: 280, // ou toute autre largeur souhaitée
  },
  dropdownSelectorContainer : {
    backgroundColor: colors.quaternary,
    overflow : 'scroll',
    maxHeight : 200,
  }
});

export default QuestionComponent;
