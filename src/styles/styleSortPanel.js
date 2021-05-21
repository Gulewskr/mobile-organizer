import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        width: "100%",
        position: "absolute",
        bottom: 0,
        zIndex: 6,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: "4%",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
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
    checkmarkContainer:{
        width: "12%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1
    },
    checkmark:{
        aspectRatio: 1,
        height: "80%"
    },
    button:{
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        flexDirection: "row"
    },
    buttonText:{
        width: "80%",
        fontSize: 18,
        marginLeft: "5%"
    },
    sortContainer:{
        alignItems: "center",
        justifyContent: "center",
        width: "96%",
        margin: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    sortRow:{
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "center"
    },
    acceptButton:{
        margin: 25,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        width: "60%",
        alignItems: "center"
    },
    font2:{
        fontSize: 20,
        marginRight: 20
    }
});

export default styles;