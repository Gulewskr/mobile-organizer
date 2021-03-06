import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {DataContext} from '../data/DataContext';
import styles from '../styles/styleSortPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const SortTaskMenu = (props) => {

    const { sortTask } = useContext(DataContext);
    const { themeID } = useTheme();

    const [o1, setO1] = useState(false);
    const [o2, setO2] = useState(false);
    //nazwa - O3T = 1- malejąco; 2- rosnąco
    const [o3, setO3] = useState(false);
    const [o3T,setO3T] = useState(1);
    //deadline - O4T = 1- malejąco; 2- rosnąco
    const [o4, setO4] = useState(false);
    const [o4T,setO4T] = useState(1);

    const sortItems = () => {
        var option1 = 0, option2 = 0, option3 = 0; 
        if(o1) option1 = 1;
        if(o2) option1 = 2;
        if(o3) option2 = o3T;
        if(o4) option3 = o4T;
        sortTask(props.id, option1, option2, option3);
    }


    const RMPicker = (params) => 
    {
        return (
            <View style={styles.picker} >
                <Picker
                    selectedValue={params.value} 
                    onValueChange={(itemValue, itemIndex) => 
                        params.valueSet(itemValue)
                        }>
                        <Picker.Item useNativeAndroidPickerStyle={false} label="malejąco" value={1} />
                        <Picker.Item useNativeAndroidPickerStyle={false} label="rosnąco" value={2} />
                </Picker>
            </View>
        );
    }

    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.header}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Filtr</Text>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton2}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1} style={[styles.button, {backgroundColor: themeID.colorButton2}]}
            onPress={()=>{setO1(!o1); if(!o1)setO2(false)}}
            >
                <Text style={[styles.buttonText, {color: themeID.colorText1}]} >{"Wyświetl tylko zadania \n z deadlinem"}</Text>
                <View style={[styles.checkmarkContainer, o1 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}>
                    <Image source={icons.checkmark} style={[styles.checkmark, o1 ? {}:{opacity: 0.2} ]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[styles.button, {backgroundColor: themeID.colorButton2}]}
            onPress={()=>{setO2(!o2); if(!o2)setO1(false)}}
            >
                <Text style={[styles.buttonText, {color: themeID.colorText1}]} >{"Wyświetl tylko zadania \n bez deadline'u"}</Text>
                <View style={[styles.checkmarkContainer, o2 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}>
                    <Image source={icons.checkmark} style={[styles.checkmark, o2 ? {}:{opacity: 0.2} ]} />
                </View>
            </TouchableOpacity>
            <View style={[styles.sortContainer, {backgroundColor: themeID.colorButton2}]}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Sortuj</Text>
                <View style={styles.sortRow}>
                    <Text style={[styles.font2, {color: themeID.colorText1}]}>nazwa</Text>
                    {/*malejąco-rosnąco*/}
                    <RMPicker value={o3T} valueSet={setO3T}/>
                    <TouchableOpacity style={[styles.checkmarkContainer, o3 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}
                        onPress={()=>setO3(!o3)}>
                        <Image source={icons.checkmark} style={[styles.checkmark, o3 ? {}:{opacity: 0.2} ]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sortRow}>
                    <Text style={[styles.font2, {color: themeID.colorText1}]}>deadline</Text>
                    {/*malejąco-rosnąco*/}
                    <RMPicker value={o4T} valueSet={setO4T}/>
                    <TouchableOpacity style={[styles.checkmarkContainer, o4 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}
                     onPress={()=>setO4(!o4)}>
                        <Image source={icons.checkmark} style={[styles.checkmark, o4 ? {}:{opacity: 0.2} ]} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={[styles.acceptButton, {backgroundColor: themeID.colorButton2}]}
                onPress={() => sortItems()}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Zastosuj</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SortTaskMenu;