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
    },
    icon:{
        height: "100%",
        aspectRatio: 1
    }
});

export default styles