import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        width: "96%",
        position: "absolute",
        zIndex: 6,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: "4%",
        borderWidth: 1,
        borderRadius: 15
    },
    button:{
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 10,
        width: "70%",
        alignItems: "center",
        margin: 5,
        borderWidth: 1,
    },
    exitButton:{
        width: "12%",
        position: "absolute",
        right: "0%",
        aspectRatio: 1,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center"
    },
    exitButtonIcon:{
        height: "60%",
        aspectRatio: 1
    },
    textNameInput:{
        padding: 5,
        borderRadius: 5,
        minWidth: "50%",
        margin: 10,
    },
    header:{
        flexDirection: "row",
        width: "100%",
        marginBottom: 5,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    font1:{
        fontSize: 22,
        fontWeight: "bold"
    },
    font2:{
        fontSize: 20,
        marginRight: 20
    }, 
    buttonIcon:{
        height: "80%",
        aspectRatio: 1,
        alignSelf: "center"
    },
    buttonIconMain:{
        width: "15%",
        marginTop: 10,
        marginBottom: 10,
        aspectRatio: 1,
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1
    },
    picker:{
        width: "60%",
        marginRight: "5%",
        paddingLeft: "10%",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        borderWidth: 1,
    },
    tagContainer:{
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        width: "90%",
    },
    tagButton:{
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        aspectRatio: 1
    },
    tagIconButton:{
        height: "90%",
        aspectRatio: 1
    }
});

export default styles;