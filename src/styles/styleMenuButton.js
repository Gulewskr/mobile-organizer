import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    menuButton: {
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 26,
        width: "95%",
        alignSelf: "center",
        backgroundColor: '#F3E05E',
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 20,
        padding: 5
    },
    menuButton_icon:{
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
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        position: "relative",
        marginLeft: 5,
        alignSelf: 'center'
    }
});

export default styles