import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';

import { deleteRecord } from './data'
import HabitLabel from './HabitLabel'
import { AntDesign } from '@expo/vector-icons';

export default function Record({ habit, description, entryTime, id, updateRecords }) {
    const deleteRecordAlert = () => {
        Alert.alert(
            "Delete Records",
            "Are you sure you'd like to delete this record?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: deleteRecordAndUpdate }
            ],
            { cancelable: false }
        );
    }

    const deleteRecordAndUpdate = async () => {
        try {
            await deleteRecord(id);
            await updateRecords();
        } catch (e) {
            console.log('deleteRecordAndUpdate');
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.habitContainer}><HabitLabel {...habit} /></View>
                <View style={styles.descriptionContainer}><Text style={styles.description}>{description}</Text></View>
                <View>
                    <Text style={styles.date}>{moment(entryTime).format('dddd, MMMM Do, h:mm a')}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={deleteRecordAlert}>
                    <AntDesign name='closecircleo' size={30} color='red' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingLeft: 7
    },
    left: {
        paddingHorizontal: 3,
        flex: 1
    },
    right: {
        paddingRight: 15,
        justifyContent: 'center'
    },
    description: {
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 12,
        width: '100%'
    },
    date: {
        textAlignVertical: 'center',
        paddingTop: 8,
        fontSize: 10,
        color: '#888',
    },
    habitContainer: {
        flexDirection: 'row'
    },
    descriptionContainer: {
        backgroundColor: 'lightgrey',
        padding: 3,
        justifyContent: 'center',
        width: 200,
        marginLeft: 5,
        marginTop: 5
    },

})