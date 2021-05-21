import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleSortPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const SortTaskMenu = (props) => {

    //const { addItemTask } = useContext(DataContext);
    const { themeID } = useTheme();

    const [o1, setO1] = useState(false);
    const [o2, setO2] = useState(false);
    const [o3, setO3] = useState(false);
    const [o4, setO4] = useState(false);

    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.header}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Filtr</Text>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
            onPress={()=>setO1(!o1)}
            >
                <Text style={[styles.buttonText, {color: themeID.colorText1}]} >{"Wyświetl tylko zadania \n z deadlinem"}</Text>
                <View style={[styles.checkmarkContainer, o1 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}>
                    <Image source={icons.checkmark} style={[styles.checkmark, o1 ? {}:{opacity: 0.2} ]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
            onPress={()=>setO2(!o2)}
            >
                <Text style={[styles.buttonText, {color: themeID.colorText1}]} >{"Wyświetl tylko zadania \n bez deadline'u"}</Text>
                <View style={[styles.checkmarkContainer, o2 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}>
                    <Image source={icons.checkmark} style={[styles.checkmark, o2 ? {}:{opacity: 0.2} ]} />
                </View>
            </TouchableOpacity>
            <View style={[styles.sortContainer, {backgroundColor: themeID.colorButton1}]}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Sortuj</Text>
                <View style={styles.sortRow}>
                    <Text style={[styles.font2, {color: themeID.colorText1}]}>nazwa</Text>
                    {/*malejąco-rosnąco*/}
                    <TouchableOpacity style={[styles.checkmarkContainer, o3 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}>
                        <Image source={icons.checkmark} style={[styles.checkmark, o3 ? {}:{opacity: 0.2} ]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sortRow}>
                    <Text style={[styles.font2, {color: themeID.colorText1}]}>deadline</Text>
                    {/*malejąco-rosnąco*/}
                    <TouchableOpacity style={[styles.checkmarkContainer, o4 ? {backgroundColor: themeID.colorContainer} : {backgroundColor: themeID.colorButtonUnchecked1}]}>
                        <Image source={icons.checkmark} style={[styles.checkmark, o4 ? {}:{opacity: 0.2} ]} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={[styles.acceptButton, {backgroundColor: themeID.colorButton1}]}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Zastosuj</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SortTaskMenu;