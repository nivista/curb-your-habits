import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import HabitLabel from './HabitLabel';
import AddHabitModal from './AddHabitModal';
import PressHabitModal from './PressHabitModal';

export default function HabitList({ habits, updateHabits, updateRecords }) {
    const [addHabitModalOpen, setAddHabitModalOpen] = useState(false);
    const [activeHabit, setActiveHabit] = useState(-1)

    const habitNameIsUnique = (name) => {
        habits[0]
        return !habits.some(habit => habit.name === name)
    }

    return (
        <View style={styles.container}>
            {habits.map((habit, idx) => {
                return (
                    <TouchableOpacity key={habit.id} style={styles.habit} onPress={() => setActiveHabit(idx)}>
                        <HabitLabel {...habit} />
                    </TouchableOpacity>
                );
            })
            }
            <TouchableOpacity style={styles.addHabit} onPress={() => setAddHabitModalOpen(true)}>
                <AntDesign name="pluscircleo" size={24} color={'black'} />
            </TouchableOpacity>
            <PressHabitModal habit={activeHabit > -1 && habits[activeHabit]} updateRecords={updateRecords}
                updateHabits={updateHabits} closeModal={() => setActiveHabit(-1)} habitNameIsUnique={habitNameIsUnique} />
            <AddHabitModal visible={addHabitModalOpen} habits={habits} habitNameIsUnique={habitNameIsUnique}
                updateHabits={updateHabits} closeModal={() => setAddHabitModalOpen(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignContent: 'center'
    },
    helpButton: {
    },
    addHabit: {
        justifyContent: 'center',
        marginLeft: 5
    },
    habit: {
        marginRight: 5,
        paddingHorizontal: 5,
        marginVertical: 5
    }
})