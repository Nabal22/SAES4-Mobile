import React, {useState} from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { deleteToken } from "../service/TokenManager";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";

function Header(props) {
    const [isPressed, setIsPressed] = useState(false);
    const [iconIsPressed, setIconIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const handleLogout = () => {
        logout(props.navigation);
    };

    return (
        <View style={styles.header}>
            <Text style={styles.header_title}>{props.title}</Text>
            <Pressable 
            style={[styles.button_icon_container, props.style, isPressed && styles.button_icon_container_pressed]}
            onPress={handleLogout}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            >
                <MaterialCommunityIcons name="logout" size={24} color={colors.tertiary} />
            </Pressable>
        </View>
    );
    }

export default Header;

function logout(navigation){
    deleteToken('userToken').then(() => {
        navigation.reset({
            index: 0,
            routes: [{name: 'LogInScreen'}],
        });
    }).catch((error) => { console.error(error); });
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        position: "relative",
    },
    header_title: {
        fontSize: 25,
        fontFamily: fonts.main,
        color: colors.secondary,
        fontWeight: "bold",
    },
    button_icon_container : {
        backgroundColor:colors.primary,
        padding : 10,
        margin: 10,
        marginLeft: 20,
        backgroundColor: colors.quaternary,
        padding : 12,
        borderRadius: 30,
        borderColor : colors.quaternary_pressed,
        borderWidth : 2
    },
    button_icon_container_pressed : {
        backgroundColor:colors.quaternary_pressed,
    },
});
