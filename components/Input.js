import React from 'react';
import {View,StyleSheet,Image,TextInput} from 'react-native'; 

import colors from '../config/colors';
import fonts from '../config/fonts';


function Input(props) {

    const editable = props.editable != "false";

    if(editable){
        return (
            <View style={[styles.input_container,props.style]}>
            
                <Image source={props.icon} style={styles.input_icon} />

                <TextInput 
                    editable
                    value = {props.value}
                    autoComplete={props.auto} 
                    secureTextEntry={props.secure} 
                    style={styles.input} 
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.dark} 
                    onChangeText={props.function}
                    onEndEditing = {props.onEndEditing}
                    autoCorrect = {props.autoCorrect}
                    autoCapitalize = {props.autoCapitalize} 
                />

            </View>
        );
    }
    return (
        <View style={[styles.input_container,props.style]}>
        
            <Image source={props.icon} style={styles.input_icon} />

            <TextInput 
                editable = {false}
                autoComplete={props.auto} 
                value = {props.value}
                secureTextEntry={props.secure} 
                style={styles.input} 
                placeholder={props.placeholder}
                placeholderTextColor={colors.dark} 
                onChangeText={props.function}
                onEndEditing = {props.onEndEditing}
                autoCorrect = {props.autoCorrect}
                autoCapitalize = {props.autoCapitalize} 
                onPressIn={props.onPressIn}
            />

        </View>
    );
    
}

export default Input;

const styles = StyleSheet.create({
    input_container:{
        flexDirection:'row',
        width:300,
        height:45,
        borderRadius:50,
        backgroundColor:colors.secondary,
        padding:15,
        alignItems:'center'
    },
    input_icon:{
        width:13,
        height:13,
        marginRight:10,
        opacity:0.5
    },
    input:{
        flex:1,
        fontFamily:fonts.main
    }
})