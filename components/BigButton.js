import React from 'react';

import {Pressable,StyleSheet,Text} from 'react-native'; 

import colors from '../config/colors';
import fonts from '../config/fonts';

function BigButton(props) {
    return (
        <Pressable 
            style={[styles.button,props.style]}
            onPress={props.function}>

            <Text style={styles.button_text}>{props.text}</Text>
            
        </Pressable>
    );
}

export default BigButton;

const styles = StyleSheet.create({
    button:{
        width:300,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:50,
        backgroundColor:colors.tertiary
    },
    button_text:{
        color:colors.secondary,
        fontSize:16,
        fontFamily:fonts.main,
        fontWeight:'bold'
    }
})