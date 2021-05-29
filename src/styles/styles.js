import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    navbar: {
        width: "100%",
        height: "16%",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row",
        borderBottomWidth: 1
    },
    navbar2: {
        paddingTop: 35,
    },
    navbar_text_Container:{
        width: "50%",
        textAlignVertical: "center",
        marginTop: "2%"
    },
    navbar_icon_continer:{
        width: "20%",
        aspectRatio: 1,
        justifyContent: "center",
        flexDirection: "row"
    },
    navbar_icon:{
        width: "100%",
        position: "relative",
        aspectRatio: 1,
        borderWidth: 3,
        borderColor: "#000000", 
        borderRadius: 45
    },
    navbar_text:{
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
        alignSelf: 'center',
        fontSize: 28
    },
    navbar_text2:{
        fontSize: 28,
        top: "12%",
    },
    navbar_button_icon:{
        height: "50%",
        aspectRatio: 1
    },
    navbar_button:{
        width: "20%",
        aspectRatio: 1, 
        backgroundColor: "#EEAF01",
        borderColor: "#000000",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 11
    },
    menuButton: {
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 15,
        width: "95%",
        alignSelf: "center",
        backgroundColor: '#F3E05E',
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 20,
        padding: 5
    },
    profile_icon:{
        width: "25%",
        aspectRatio: 1,
        borderWidth: 3,
        borderColor: "#000000", 
        borderRadius: 45
    },
    menuButton_textContainer:{
        justifyContent: "center",
        width: "75%",
        textAlignVertical: "center",
    },
    menuButton_text:{
        fontSize: 30,
        fontWeight: 'bold',
        position: "relative",
        marginLeft: 5,
        alignSelf: 'center'
    },
    exitButtonContainer:{
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        height: 60,
        marginBottom: 5,
    },
    exitButton:{
        position: "absolute",
        right: 10,
        zIndex: 5,
        top: 10,
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
    ConfirmButton:{
        position: "absolute",
        width: "100%",
        top:"40%",
        borderWidth: 1,
        padding: 10,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        alignItems: 'center', 
        alignSelf:"center",
        justifyContent: "center"
    },
    ConfirmButtonText:{
        fontSize: 20,
        textAlign: "center"
    },
    ConfirmButtonButton:{
        padding: 5,
        width: "25%",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
    },
    fillRect:{
        position: "absolute",
        zIndex: 2,
        left: 0, 
        right: 0, 
        top: 0, 
        bottom: 0
    }
  });

export default styles