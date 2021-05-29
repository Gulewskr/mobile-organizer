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
        marginTop: 10,
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
    tagFilterRow:{
        width:"100%",
        flexDirection: "row"
    }, 
    tagContainerFilter:{
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
    },
    tagFilterButtonContainer:{
        width: "15%",
        marginLeft: 10,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        
    },
    tagFilterButton:{
        width: "100%",
        marginBottom: 5,
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
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
    },
    tagItem:{
        padding: 4,
        borderWidth: 1,
        margin: 2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 5
    },
    tagItemIcon:{
        height: 20,
        aspectRatio: 1,
        marginLeft: 10
    },
    cross:{
        height: 20,
        aspectRatio: 1
    },
    PickerRowWithText:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    PickerRowWithTextText:{
        fontSize: 20,
        marginRight: 10,
        marginTop: 10
    }
});

export default styles;