import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    optionContainer:{
        width: "94%",
        alignSelf: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    font:{
        fontSize: 18
    },
    font2:{
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,
    },
    nameFont:{
        fontSize: 28,
        margin: 5,
    },
    sectorL:{
        width:"70%", 
        alignItems: "center",
        justifyContent: "center",
    }, 
    sectorR:{
        width:"30%", 
        alignItems: "center",
        justifyContent: "center",
    },
    iconButton:{
        width: "80%",
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 2,
        justifyContent: "center",
    },
    icon:{
        height: "100%",
        aspectRatio: 1
    },
    iconMenu:{
        width: "28%",
        margin: 5,
        borderWidth: 2,
        borderRadius: 100,
        aspectRatio: 1,
    },
    line:{
        width: "100%",
        borderWidth: 1
    },
    profileBackground:{
        width: "100%",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
    },
    ProfileAvatar:{
        width: "50%",
        aspectRatio: 1,
        borderRadius: 200, 
        borderWidth: 2,
    },  
    profileContainer:{
        width: "94%",
        alignSelf: "center",
        overflow: "hidden",
        borderWidth: 1,
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
    }
});

export default styles