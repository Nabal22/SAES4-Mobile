import {Appearance} from 'react-native';

const mode = Appearance.getColorScheme();

export default{
    primary: mode === 'light' ? "#48BF84" : "#2A4747",
    secondary:"#EFF1F3",
    tertiary: mode === 'light' ? "#2A4747" : "#48BF84",
    dark:"#000",
    textcol: mode === 'light' ? "#000" : "#EFF1F3",
}