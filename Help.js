import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function Help({ visible, close }) {
    return (
        <Modal style={styles.modal} visible={visible} transparent={true}>
            <View style={styles.container}>
                <View style={styles.instruction}>
                    <Text style={styles.instructionNumber}>1.</Text>
                    <Text style={styles.instructionText}>Use "plus" to add to list of habits you want to curb.</Text>
                </View>

                <View style={styles.instruction}>
                    <Text style={styles.instructionNumber}>2.</Text>
                    <Text style={styles.instructionText}>When you feel the impulse to engage in that habit, press it and note observations about thoughts and/or circumstances.</Text>
                </View>
                <View style={styles.instruction}>
                    <Text style={styles.instructionNumber}>3.</Text>
                    <Text style={styles.instructionText}>Reflect, focus on observations to better understand yourself and your patterns.</Text>
                </View>
                <Button title="close" color="blue" onPress={close} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignContent: 'center',
        margin: 30,
    },
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 100,
        padding: 3,
        paddingTop: 30,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'grey',
        justifyContent: 'space-between'
    },
    instruction: {
        flexDirection: 'row',
        marginLeft: 10
    },
    instructionNumber: {
        fontSize: 18,
        marginRight: 10
    },
    instructionText: {
        width: 250
    }
})
