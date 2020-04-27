import React, {useState} from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Help from './Help';

export default function Header(props) {
    const [helpVisible, setHelpVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Curb Your Habits</Text>
            <TouchableOpacity style={styles.helpButton} onPress={() => setHelpVisible(true)}>
                <AntDesign name="questioncircleo" size={30} color={'black'} />
            </TouchableOpacity>
            <Help visible={helpVisible} close={() => setHelpVisible(false)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 8
    },
    title: {
        color: '#888',
        fontSize: 25
    }
})