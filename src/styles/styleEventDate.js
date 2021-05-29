import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    addEventContainer: {
        position: "absolute", 
        width: "94%",
        top: "20%", 
        borderWidth: 1,
        borderRadius: 15,
        paddingBottom: "8%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10
    },
    dataChangeContainer:{
        borderWidth: 1,
        width: "94%",
        marginBottom: 5,
        borderRadius: 10,
        alignItems: "center",
        padding: 5
    },
    scrollChooseButton:{
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        borderRightWidth: 1,
        borderLeftWidth: 1,
        height: 30
    },
    scrollChooseButtonUP:{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopWidth: 1,
    },
    scrollChooseButtonDown:{
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomWidth: 1,
    },
    scrollChooseCell:{
        alignItems: "center",
        borderWidth: 1,
        width: "100%",
        alignSelf: "center",
        height: 30,
        justifyContent: "center",
        borderRadius: 5
    },
    scrollChooseCellLeft:{
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: -1,
    },
    scrollChooseCellRight:{
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    singleDayButton:{
        width: 40,
        aspectRatio: 1,
        margin: 3,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    singleDayButtonText:{

    },
    scrollChoose:{
        marginBottom: "5%",
        width: "31.5%",
    },
    timeSplitter:{
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignSelf: "center",
        justifyContent: "center",
        height: 30,
        width: 10,
        marginBottom: "5%",
    },
    IconPicker:{
        width: "60%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 100,
    },
    eventIcon:{
        height: "99%",
        aspectRatio: 1,
    },
    pickerIcon:{
        position: "absolute",
        height: "40%",
        aspectRatio: 1,
        right: 0,
        bottom: -3,
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    pickerIconBrush:{
        height: "60%",
        aspectRatio: 1,
    },
    iconChoseContainer:{
        width: "90%",
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        marginBottom: 5
    },
    iconChoseContainerText:{
        marginBottom: 15,
        fontSize: 16,
        alignSelf: "center",
    },
    iconEventIconRow:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    iconEventIcon:{
        width: "25%",
        aspectRatio: 1
    },
    exitButtonContainer:{
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        height: 60,
        marginBottom: 5,
    },
    exitButton:{
        zIndex: 5,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 15
    },
    exitButtonIcon:{
        height: "60%",
        aspectRatio: 1
    },
});

export default styles