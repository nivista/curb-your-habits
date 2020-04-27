import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Modal, TextInput, Button } from 'react-native';

import ColorPicker from './ColorPicker'
import { updateHabitColor, createRecord, deleteHabitAndCascade, updateHabitName } from './data';

export default function PressHabitModal({ habit, updateHabits, closeModal, updateRecords, habitNameIsUnique }) {
    const [entry, setEntry] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [formName, setFormName] = useState('');

    const submitRecordAndClose = async () => {
        closeModalAndClearState();
        try {
            await createRecord(habit.id, entry);
            await updateRecords();
        } catch (e) {
            console.log('submitRecordAndClose');
            console.log(e);
        }
    }

    const submitChangesAndClose = async () => {
        if (!habitNameIsUnique(formName)) {
            Alert.alert(
                "Not unique",
                "A habit with this name already exists, try a different name.",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        } else {
            const changes = [];
            if (selectedColor !== habit.color) {
                changes.push(updateHabitColor(habit.id, selectedColor))
            }
            if (formName !== '') {
                changes.push(updateHabitName(habit.id, formName))
            }
            closeModalAndClearState();

            try {
                await Promise.all(changes);
                await updateHabits();
            } catch (e) {
                console.log('submitChangesAndClose');
                console.log(e);
            }
        }
    }

    const closeModalAndClearState = () => {
        setEntry('');
        setSelectedColor(null);
        setFormName('');
        closeModal();
    }

    const alertDeleteHabit = () => {
        Alert.alert(
            "Delete Habit",
            "Are you sure you'd like to delete this habit and all associated records?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: deleteHabitAndRecords }
            ],
            { cancelable: false }
        );
    }

    const deleteHabitAndRecords = async () => {
        closeModalAndClearState();
        try {
            await deleteHabitAndCascade(habit.id)
            await updateRecords();
            await updateHabits();
        } catch (e) {
            console.log('deleteHabitAndRecords');
            console.log(e);
        }
    }

    if (!habit) return null;

    if (selectedColor === null) {
        setSelectedColor(habit.color)
    }
    return (
        <Modal transparent={true}>
            <View style={styles.container} >
                <View style={styles.addRecord}>
                    <Text>Record:</Text>
                    <TextInput numberOfLines={4} multiline={true}
                        placeholder={'Optional: Note thoughts and/or circumstances surrounding impulse.'}
                        value={entry} onChangeText={setEntry} style={styles.addRecordInput} autoFocus={true} />
                    <Button onPress={submitRecordAndClose} title='Submit Record' color='green' />
                </View>
                <View style={styles.editHabit}>
                    <Text>Rename Habit: </Text>
                    <TextInput placeholder={habit.name} value={formName} onChangeText={setFormName} style={styles.renameHabitInput} />
                    <Text>Change Color: </Text>
                    <ColorPicker selectedValue={selectedColor} style={styles.picker} onValueChange={color => setSelectedColor(color)} />
                </View>
                <View style={styles.horizontalContainer}>
                    <View style={styles.sideBySide} >
                        <Button onPress={submitChangesAndClose} title='Submit Changes' color='green' disabled={formName == '' && selectedColor == habit.color} />
                    </View>
                    <View style={styles.sideBySide}>
                        <Button onPress={alertDeleteHabit} title='Delete Habit' color='red' style={styles.button} />
                    </View>
                </View>
                <Button onPress={closeModalAndClearState} title='Close' color='blue' />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 80,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'gray',
        padding: 3
    },
    addRecord: {
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },
    horizontalContainer: {
        flexDirection: 'row'
    },
    sideBySide: {
        flex: 1
    },
    addRecordInput: {
        textAlignVertical: 'top',
        marginTop: 3
    },
    renameHabitInput: {
        paddingLeft: 8
    },
    button: {
        height: 40
    },
    editHabit: {
        paddingLeft: 3,
        paddingTop: 5
    }
})