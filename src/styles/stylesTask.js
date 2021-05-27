import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    taskContainer: {
        borderColor: "#000000",
        borderRadius: 15,
        borderWidth: 1,
        width: "90%",
        marginBottom: 20,
        paddingLeft: 30,
        padding: 10,
        alignSelf:"center",
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: 16,
    },
    deadlineText:{
        marginLeft: 20,
        fontSize: 18,
        color: "#FE1010",
    },
    proggresText:{
        fontSize: 18,
        marginLeft: 40,
        color: "#129403",
    },
    optionContainer:{
        zIndex: 5,
        position: "absolute",
        top: "36%",
        width: "96%",
        alignSelf:"center",
        borderWidth: 1,
        borderRadius: 15,
        zIndex: 4,
        padding: 20
    },
    optionsText:{
        fontSize: 20,
        textAlign: "center"
    },
    optionsTextInputContainer:{
        marginBottom: 15, 
        flexDirection: "row",
        maxHeight: "25%"
    },
    optionsTextInput:{
        maxWidth: "65%",
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
        fontSize: 20
    },
    headerContainerInput:{

    },
    headerContainer:{
        width: "100%",
        maxHeight: "65%",
        padding: 10,
        flexDirection: "row",
        borderBottomWidth: 1
    },
    headerContainerNotes:{
        width: "100%",
        minHeight: 50,
        maxHeight: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1
    },
    headerContainer2:{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
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
    sectorHeader:{
        width: "100%",
        marginLeft: "3%",
        marginBottom: 10,
        flexDirection: "row"
    },
    line:{
        width: "100%",
        height: 2
    },
    headerButton:{
        width: "10%",
        aspectRatio: 1
    },
    iconContainer2:{
        width: "20%",
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;