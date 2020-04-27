import React, { useState } from 'react';
import { Modal, TextInput, Text, StyleSheet, View, Button, Alert } from 'react-native';

import { createHabit } from './data';
import ColorPicker from './ColorPicker';

export default function AddHabitModal({ habitNameIsUnique, updateHabits, closeModal, visible }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('blue');

    const submitHabit = async () => {
        if (name === '') {
            Alert.alert("Habit name required",
                "Try Again",
                [{
                    text: "Cancel",
                    style: "cancel"
                }])
        } else if (!habitNameIsUnique(name)) {
            Alert.alert("Habit name not unique",
                "A Habit already exists with that name",
                [{
                    text: "Cancel",
                    style: "cancel"
                }])
        } else {
            try {
                await createHabit(name, color);
                await updateHabits();
            } catch (e) {
                console.log('In submit habit');
                console.log(e);
            } finally {
                clearAndCloseModal();
            }
        }
    }

    const clearAndCloseModal = () => {
        setColor('blue');
        setName('');
        closeModal();
    }

    if (!visible) return null;

    return (
        <Modal style={styles.modal} transparent={true}>
            <View style={styles.container}>
                <View style={styles.forms}>
                <Text>Name:</Text>
                <TextInput onChangeText={setName} value={name} autoFocus={true} placeholder='New Habit Name' />
                <Text style={{marginTop: 5}}>Color:</Text>
                <ColorPicker selectedValue={color} onValueChange={(val) => setColor(val)} />
                </View>
                <View style={styles.buttons}>
                <Button color='green' title='Add Habit' onPress={submitHabit} />
                <Button color='blue' title='Cancel' onPress={clearAndCloseModal} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        marginVertical: 150,
        marginHorizontal: 30,
        borderWidth: 2,
        borderColor: 'gray'
    },
    forms: {
        marginVertical: 30,
        marginHorizontal: 20,
    },
    buttons: {
        margin: 3
    }
})