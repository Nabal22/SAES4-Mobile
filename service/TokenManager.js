import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (key, token) => {
  try {
    await AsyncStorage.setItem(key, token);
    console.log('Token enregistré avec succès');
  } catch (error) {
    console.log("Erreur lors de l'enregistrement du token", error);
  }
};

export const retrieveToken = async (key) => {
  try {
    const token = await AsyncStorage.getItem(key);
    if (token) {
      // console.log('Token récupéré :', token);
      return token;
    } else {
      console.log('Aucun token trouvé');
      return null;
    }
  } catch (error) {
    console.log("Erreur lors de la récupération du token", error);
    return null;
  }
};

export const deleteToken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Token supprimé avec succès');
  } catch (error) {
    console.log("Erreur lors de la suppression du token", error);
  }
}