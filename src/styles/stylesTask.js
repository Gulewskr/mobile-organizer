import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    taskContainer: {
        borderColor: "#000000",
        borderRadius: 25,
        borderWidth: 1,
        width: "90%",
        marginTop: 20,
        paddingLeft: 30,
        padding: 10,
        alignSelf:"center",
        flexDirection: "row"
    },
    textContainer:{
        width: "70%",
        flexDirection: "column"
    },
    iconContainer:{
        borderWidth: 1,
        borderRadius: 45,
        marginLeft: "10%",
        alignSelf:"center",
        padding: 15
    },
    icon:{
        height: 30,
        width: 30,
        aspectRatio: 1,
        alignSelf: "center"
    },
    taskText:{
        fontSize: 20,
    },
    deadlineText:{
        fontSize: 20,
        marginLeft: 20,
        color: "#FE1010",
    },
    proggresText:{
        fontSize: 20,
        marginLeft: 40,
        color: "#129403",
    },
    optionContainer:{
        zIndex: 5,
        position: "absolute",
        top: "30%",
        width: "100%",
    },
    optionContainerInside:{
        width: "100%",
        borderWidth: 1,
        borderRadius: 26,
        padding: 20
    },
    optionsText:{
        fontSize: 26,
    },
    optionsTextInputContainer:{
        marginBottom: 15, 
        flexDirection: "row",
        justifyContent: "center"
    },
    optionsTextInput:{
        maxWidth: "55%",
        borderRadius: 5,
        padding: 2
    },
    optionButtons:{
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
    },
});

export default styles;