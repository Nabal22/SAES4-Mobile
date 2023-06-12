import {Appearance} from 'react-native';

const mode = Appearance.getColorScheme();

const images = {
    universal:{
        whiteLogo:require("../assets/images/allegro.png"),
        backArrow:require("../assets/images/back.png")
    },
    authentication: {
        background: mode === 'light' ? require("../assets/images/authentication/background-light.png") : require("../assets/images/authentication/background-dark.png"),
        accountChoiceBackground: require("../assets/images/authentication/stacked-waves-haikei.png"),
        user: require("../assets/images/authentication/user.png"),
        email: require("../assets/images/authentication/envelope.png"),
        password: require("../assets/images/authentication/lock.png"),
        accountChoice:{
            standard:require("../assets/images/authentication/listen.png"),
            artist:require("../assets/images/authentication/singer.png"),
            label:require("../assets/images/authentication/record-label.png"),
            venue:require("../assets/images/authentication/concert.png")
        }
    }
};
    
    export default images;