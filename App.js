import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';

import HabitList from './HabitList';
import FilterRecords from './FilterRecords';
import Record from './Record';
import Header from './Header';
import { initializeTables, readHabits, readRecords, execSql } from './data';

export default function App() {
  const [habits, setHabits] = useState(null);
  const [records, setRecords] = useState(null);

  const updateHabits = async () => {
    try {
      const res = await readHabits();
      setHabits(res);

    } catch (e) {
      console.log('updateHabits Error')
      console.log(e);
    }
  }

  const updateRecords = async () => {
    //TODO, sort
    try {
      const res = await readRecords();
      setRecords(res);
    } catch (e) {
      console.log('updateRecords Error')
      console.log(e);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        //await Promise.all([execSql('DROP TABLE records'), execSql('DROP TABLE habits')]);
        await initializeTables();
        updateHabits();
        updateRecords();
      } catch (e) {
        console.log('useEffect App')
        console.log(e)
      }
    })();
  }, [])

  if (habits === null || records === null) {
    return <View><View style={styles.blankSpace} /><Text>Loading....</Text></View>
  }

  records.forEach(record => {
    record.habit = habits.find(habit => habit.id === record.habitID)
  });

  const filteredRecords = records.filter(record => record.habit.filterStatus);

  const renderListItem = ({ item }) => {
    return <Record {...item} updateRecords={updateRecords} />
  }

  return (
    <FlatList contentContainerStyle={styles.container} ListFooterComponent={<View style={styles.blankSpace} />}
      ListHeaderComponent={
        <>
          <Header />
          <HabitList habits={habits} updateHabits={updateHabits} updateRecords={updateRecords} />
          <FilterRecords habits={habits} updateHabits={updateHabits} />
        </>} data={filteredRecords} renderItem={renderListItem} keyExtractor={record => record.id.toString()}
    />

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#888',
    marginTop: 38
  },
  blankSpace: {
    height: 100,
    backgroundColor: 'white'
  }
});
