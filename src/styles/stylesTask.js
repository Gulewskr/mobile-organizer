import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    taskContainer: {
        borderColor: "#000000",
        borderRadius: 15,
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
        borderRadius: 15,
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
        marginLeft: 20,
        fontSize: 20,
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
        width: "96%",
        alignSelf:"center"
    },
    optionContainerInside:{
        width: "100%",
        borderWidth: 1,
        borderRadius: 15,
        zIndex: 3,
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
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center",
    },
    headerText:{
        fontSize: 26
    },
    headerContainer:{
        width: 400,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        borderBottomWidth: 1
    },
    addButton:{
        position: "absolute",
        top: "80%",
        right: "4%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        height: "9%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5
    },
    sortButton:{
        position: "absolute",
        top: "90%",
        left: "4%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        height: "9%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5
    },
    deleteButton:{
        position: "absolute",
        top: "90%",
        right: "4%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        height: "9%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5
    },  
    buttonIcon:{
        height: "90%",
        aspectRatio: 1,
    },
});

export default styles;