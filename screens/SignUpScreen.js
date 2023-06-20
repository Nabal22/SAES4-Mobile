import React, {useState} from 'react';
import {StyleSheet, Text,Image,SafeAreaView,Alert,ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity,View } from 'react-native'; 
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

import colors from '../config/colors';
import fonts from '../config/fonts';
import Input from '../components/Input';
import images from '../config/images';
import BigButton from '../components/BigButton';
import signUp from '../service/SignUp.js';


function SignUpScreen(props) {

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [dateNaissance, setDateNaissance] = useState(new Date());
    const [dateNaissanceText, setDateNaissanceText] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [ville, setVille] = useState('');

    const navigation = useNavigation();

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onPickerChange = ({type},selectedDate) => {
        if (type == "set"){
            setDateNaissance(selectedDate);
            setDateNaissanceText(format(selectedDate, "yyyy-MM-dd").toString());
            console.log(dateNaissanceText);
        }else{
            toggleDatePicker();
        }
    }


    return (
        <ImageBackground 
            source={images.authentication.background} 
            resizeMode="cover" 
            style={styles.imageContainer}>

            <SafeAreaView style={styles.container}>  
                <Text style={styles.title} >Inscription</Text>
                

                <Image style = {styles.logo} source={images.universal.logo} />


                <KeyboardAvoidingView style={styles.form} behavior={'position'}>

                    <Input style={styles.input} icon={images.authentication.user} auto="family-name" placeholder="Nom" function={setNom} autoCorrect={false} />

                    <Input style={styles.input} icon={images.authentication.user} auto="given-name" placeholder="Prenom" function={setPrenom} autoCorrect={false} />

                    <Input style={styles.input} icon={images.authentication.date} placeholder="Date de naissance" value={dateNaissanceText} onChangeText={setDateNaissance} autoCorrect={false} autoCapitalize='none' editable="false" onPressIn={toggleDatePicker}/>

                    {showPicker && (<DateTimePicker maximumDate={new Date()} style={styles.datePicker}  mode ="date" display="spinner" value={dateNaissance} onChange={onPickerChange}/>)}

                    {showPicker && Platform.OS &&
                        (
                            <View style={{justifyContent:"space-around",flexDirection:"row"}}>
                                <TouchableOpacity style={styles.dateCancelButton} onPress={toggleDatePicker}>
                                    <Text>Fermer</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                    <Input style={styles.input} icon={images.authentication.localisation} placeholder="Ville" function={setVille} autoCorrect={false} />

                    <Input style={styles.input} icon={images.authentication.email} auto="email" placeholder="Email" function={setEmail} autoCorrect={false} autoCapitalize='none'/>

                    <Input style={styles.inputSpacing} icon={images.authentication.password} secure={true} auto="new-password" placeholder="Mot de passe" function={setPassword} autoCorrect={false} autoCapitalize='none'/>

                    <BigButton style={styles.buttonSpacing} text="S'inscrire" function={()=> {
                        if (email === '' || prenom === '' || nom === '' || dateNaissanceText === '' || prenom === '' || password === '')
                            Alert.alert("Champs invalides","Tous les champs sont requis");
                        else
                            signUp(nom,prenom,dateNaissanceText,ville,email,password,navigation);
                    }} />

                </KeyboardAvoidingView>

                <Text style={styles.bottom_text}>
                    Vous avez déjà un compte ? <Text style={{textDecorationLine:'underline', fontWeight:'bold'}} onPress={()=> {navigation.navigate('LogInScreen')}}>Connectez-vous</Text>
                </Text>

            </SafeAreaView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:colors.secondary,
        fontFamily:fonts.main
    },
    logo:{
        marginTop:-20,
        width: 150,
        height: 150
    },
    form:{
        marginTop:-20
    },
    inputSpacing:{
        marginBottom:20
    },
    input:{
        marginBottom:20,
        borderColor:'none',
        borderWidth:0
    },
    buttonSpacing:{
        marginTop:20
    },
    bottom_text:{
        fontFamily:fonts.main,
        marginBottom:30,
        color:colors.textcol
    },
    datePicker:{
        height:120
    },
    dateCancelButton:{
        height:30,
        width:80,
        backgroundColor:colors.secondary,
        borderRadius:50,
        padding:2,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:15
    }
    
})

export default SignUpScreen;

