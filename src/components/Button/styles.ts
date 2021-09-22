import { StyleSheet } from "react-native"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
    },
    text:{
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    }
})
