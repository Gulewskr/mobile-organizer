//Prototyp przycisku potwierdzającego
const [v, setV] = useState(false);
const ConfirmButton = () => {
    const confirm = (bool) => {
        if(bool){
            //funkcja gdy potwierdzono
        }else{
            //funkcja gdy anulowano
        }
        setV(false);
    };
    if(v){
        return (
            <View>
                <Text>{tasksItems[taskID].ended ? "Czy chcesz kontynuować zadanie?" : "Czy chcesz zakończyć zadanie?"}</Text>
                <View>
                    <TouchableOpacity onPress = {() => confirm(true)}>
                        <Text>Tak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => confirm(false)}>
                        <Text>Nie</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }else{
        return null
    }
};