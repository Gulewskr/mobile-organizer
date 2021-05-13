import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    callendarMatrix:{
        width: "100%"
    },
    callendarHeaderRow:{
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        borderBottomWidth: 1
    },
    callendarHeaderCell:{
        width: "12%",
        padding: "2%",
        marginLeft: "1%",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
        marginRight: "1%"
    },
    callendarRow:{
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 5
    },
    singleDay: {
        borderWidth: 1,
        borderRadius: 5,
        width: "12%",
        padding: "2%",
        marginLeft: "1%",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        textAlignVertical: "center",
        marginRight: "1%"
    },
    optionsHeader:{
        width: "100%",
        height: "10%",
        justifyContent: "center",
        borderBottomWidth: 1,
        flexDirection: "row",
        padding: "3%",
        alignItems: "center"
    },
    optionsText:{
        fontSize: 23,
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    optionsButton:{
        height: "80%",
        aspectRatio: 1,
        alignItems:"center",
        justifyContent: "center",
        padding: 5,
        borderWidth: 1,
        borderRadius: 5
    },
    optionsButtonIns:{
        height: "100%",
        aspectRatio: 1,
    }
});

export default styles;