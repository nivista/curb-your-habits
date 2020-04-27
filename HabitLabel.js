import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function HabitLabel({ name, color }) {
    return <Text style={{...styles.text, backgroundColor: color}}>{name}</Text>
}

const styles = StyleSheet.create({
    text: {
        padding: 4,
        color: 'white',
        fontSize: 14,
        borderRadius: 0
    }
})
