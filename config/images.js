import {Appearance} from 'react-native';

const mode = Appearance.getColorScheme();

const images = {
    universal:{
        logo:require("../assets/images/CASBT_logo.png"),
        backArrow:require("../assets/images/back.png"),
        logout:require("../assets/images/logout.png")
    },
    authentication: {
        background: mode === 'light' ? require("../assets/images/authentication/background-light.png") : require("../assets/images/authentication/background-dark.png"),
        accountChoiceBackground: require("../assets/images/authentication/stacked-waves-haikei.png"),
        user: require("../assets/images/authentication/user.png"),
        email: require("../assets/images/authentication/envelope.png"),
        password: require("../assets/images/authentication/lock.png"),
        date:require("../assets/images/authentication/calendar-days.png"),
        localisation:require("../assets/images/authentication/marker.png")
    }
};
    
export default images;