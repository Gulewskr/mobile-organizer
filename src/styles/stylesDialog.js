import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        width: "96%",
        position: "absolute",
        marginTop: "35%",
        zIndex: 6,
        alignItems: "center",
        justifyContent: "center",
        padding: "4%",
        borderWidth: 1,
        borderRadius: 15,
    },
    questionText:{
        fontSize: 20,
        width: "70%",
        marginRight: 60,
        margin: 20,
        textAlign: "center"
    },
    buttonContainer:{
        flexDirection: "row"
    },
    button:{
        width: "30%",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 15
    }
});

export default styles;