import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        width: "96%",
        top: "40%",
        position: "absolute",
        zIndex: 6,
        alignSelf: "center",
        alignItems: "center",
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
        fontSize: 20
    }
});

export default styles;