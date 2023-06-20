import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import colors from '../config/colors';
import fonts from '../config/fonts';

function QuestionComponent(props) {
  const { question, reponsePossible } = props;
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    props.onSelectedItemsChange(question.id, selectedItems);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.contenu}</Text>
        {question.type === 'TEXTE' && (
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onSelectedItemsChange([text])}
            value={selectedItems}
          />
        )}
        {question.type === 'CHECKBOX' && (
          <MultiSelect
            items={reponsePossible}
            uniqueKey='id'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Choisissez une réponse"
            searchInputPlaceholderText="Rechercher une réponse..."


            tagRemoveIconColor={colors.primary}
            tagBorderColor={colors.primary}
            tagTextColor={colors.primary}
            selectedItemTextColor={colors.primary}
            selectedItemIconColor={colors.primary}
            itemTextColor="#000"
            displayKey="reponse"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor={colors.primary}
            submitButtonText="Valider"
            single={true}
          />
        )}

        {question.type === 'LIST' && (
          <MultiSelect
            items={reponsePossible}
            uniqueKey='id'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}

            selectText="Selectionnez plusieurs réponses"
            searchInputPlaceholderText="Rechercher une réponse..."
            tagRemoveIconColor={colors.primary}
            tagBorderColor={colors.primary}
            tagTextColor={colors.primary}
            selectedItemTextColor={colors.primary}
            selectedItemIconColor={colors.primary}
            itemTextColor="#000"
            displayKey="reponse"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor={colors.primary}
            submitButtonText="Valider"
            multiple={true}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,

  },
  questionContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  questionText: {
    fontFamily: fonts.primary,
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default QuestionComponent;
