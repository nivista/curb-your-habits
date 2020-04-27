import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import FilterRecordsModal from './FilterRecordsModal'

export default function FilterRecords({ habits, updateHabits }) {
    const [filterOpen, setFilterOpen] = useState(false);



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilterOpen(true)}>
                <AntDesign name='filter' size={30} color='black' />
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
            <FilterRecordsModal visible={filterOpen} closeModal={() => setFilterOpen(false)}
                habits={habits} updateHabits={updateHabits} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 3,
        justifyContent: 'flex-start'
    },
    filterButton: {
        flexDirection: 'row',
    },
    filterButtonText: {
        textAlignVertical: 'center',
        paddingHorizontal: 4
    },
})