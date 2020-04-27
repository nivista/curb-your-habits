import React from 'react';

import { Picker } from '@react-native-community/picker';

export default function ColorPicker({ selectedValue, onValueChange }) {
    return (
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
            <Picker.Item label='Blue' value='steelblue' />
            <Picker.Item label='Red' value='tomato' />
            <Picker.Item label='Green' value='springgreen' />
            <Picker.Item label='Teal' value='teal' />
            <Picker.Item label='Burlywood' value='burlywood' />
            <Picker.Item label='Chocolate' value='chocolate' />
            <Picker.Item label='Indigo' value='indigo' />
            <Picker.Item label='Teal' value='teal' />
        </Picker>
    )
}