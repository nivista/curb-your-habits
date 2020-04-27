import React, { useState } from 'react';
import { Modal, StyleSheet, View, Button, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { updateHabitFilterStatus } from './data';
import HabitLabel from './HabitLabel';

export default function FilterRecordsModal({ visible, closeModal, habits, updateHabits }) {
    const [filterStatuses, setFilterStatuses] = useState(null);

    const persistFilterStatusChanges = async () => {
        const operations = [];
        filterStatuses.forEach((filterStatus, idx) => {
            if (filterStatus !== habits[idx].filterStatus) {
                operations.push(updateHabitFilterStatus(habits[idx].id, filterStatus))
            }
        })
        try {
            await Promise.all(operations);
            await updateHabits();
        } catch (e) {
            console.log('persistFilterStatusChanges');
            console.log(e);
        }
    }

    const renderHabitWithCheckbox = (habit, index) => {
        return (
            <View style={styles.filterItem} key={habit.id.toString()}>
                <CheckBox onValueChange={val => updateFilterStatuses(index, val)}
                    value={filterStatuses[index]} style={styles.checkbox} />
                <View>
                    <HabitLabel {...habit} />
                </View>
            </View>
        )
    }

    const updateFilterStatuses = (index, val) => {
        const temp = filterStatuses.slice();
        temp[index] = val;
        setFilterStatuses(temp)
    }

    if (!visible) {
        // if array is not empty, persist array and set it to null
        if (filterStatuses) {
            persistFilterStatusChanges();
            setFilterStatuses(null);
        }
        return null;
    }
    if (!filterStatuses) {
        const newFilterStatuses = [];
        habits.forEach(habit => newFilterStatuses.push(habit.filterStatus === 1));
        setFilterStatuses(newFilterStatuses);
        return null;
    }

    return (
        <Modal transparent={true}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <ScrollView contentContainerStyle={styles.habitToggleList} nestedScrollEnabled={true}>
                        {habits.map(renderHabitWithCheckbox)}
                        <View style={styles.spacer} />
                    </ScrollView>

                </View>
                <Button color='blue' title='close' onPress={closeModal} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 180,
        marginHorizontal: 30,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'gray',
        padding: 3
    },
    top: {
        borderColor: 'black',
        flex: 1,
    },
    filterItem: {
        flexDirection: 'row',
        marginVertical: 3,
        alignContent: 'center'
    },
    habitToggleList: {
        margin: 10,
    },
    spacer: {
        height: 20
    }
})