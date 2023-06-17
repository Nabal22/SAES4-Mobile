import {Appearance} from 'react-native';

const mode = Appearance.getColorScheme();

export default{
    primary: mode === 'light' ? "#48BF84" : "#2A4747",
    secondary:"#F2F2ED",
    tertiary: mode === 'light' ? "#2A4747" : "#48BF84",
    quaternary: mode === 'light' ? "#3B8E5A" : "#1C3535",
    primary_pressed:'light' ? "#3B8E5A" : "#1C3535",
    secondary_pressed: "#D3D7DB",
    tertiary_pressed: 'light' ? "#1C3535" : "#3B8E5A",
    quaternary_pressed: 'light' ? "#1C3535" : "#3B8E5A",
    dark:"#000",
    textcol: mode === 'light' ? "#000" : "#EEEEE2",
}