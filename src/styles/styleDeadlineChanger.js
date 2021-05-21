import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    changerContainer: {
        position: "absolute", 
        width: "94%",
        top: "40%", 
        borderWidth: 1,
        borderRadius: 15,
        padding: "8%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5
    },
    changerText:{
        marginBottom: 15,
        fontSize: 20
    },
    scrollList:{
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5
    },
    scrollChoose:{
        marginRight: "3%",
        marginBottom: "5%",
        width: "31.5%",
    },
    scrollChooseCell:{
        alignItems: "center"
    },
    scrollChooseButton:{
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"
    },
    scrollChooseButtonIcon:{
        height: 30,
        aspectRatio: 1
    },
    changerButton:{
        width: "70%",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderRadius: 5
    },
    icon:{
        
    }
  });

export default styles