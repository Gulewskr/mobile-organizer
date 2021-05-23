import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        bottom: 0,
        left: 0, 
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
        width: "100%",
        height: "8%"
    },
    button:{
        height: "90%",
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    fontSq:{
        padding: 13,
        margin: 25,
        borderRadius: 10,
        borderWidth: 1
    },
    font:{
        fontSize: 22
    },
    icon:{
        height: "85%",
        width: "85%"
    },
});

export default styles;