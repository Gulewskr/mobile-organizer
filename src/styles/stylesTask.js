import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    taskContainer: {
        borderColor: "#000000",
        borderRadius: 25,
        borderWidth: 1,
        width: "90%",
        marginTop: 20,
        paddingLeft: 30,
        padding: 10,
        alignSelf:"center",
        flexDirection: "row"
    },
    textContainer:{
        width: "70%",
        flexDirection: "column"
    },
    iconContainer:{
        borderWidth: 1,
        borderRadius: 45,
        marginLeft: "10%",
        alignSelf:"center",
        padding: 15
    },
    icon:{
        height: 30,
        aspectRatio: 1,
    },
    taskText:{
        fontSize: 20,
    },
    deadlineText:{
        fontSize: 20,
        marginLeft: 20,
        color: "#FE1010",
    },
    proggresText:{
        fontSize: 20,
        marginLeft: 40,
        color: "#129403",
    }

});

export default styles;