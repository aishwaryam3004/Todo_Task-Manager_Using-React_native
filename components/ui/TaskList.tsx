import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(data);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      completed: !task.completed
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.task}>
          <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
            {item.title}
          </Text>
          <View style={styles.buttons}>
            <Button title="✅" onPress={() => toggleComplete(item)} />
            <Button title="🗑️" onPress={() => deleteTask(item.id)} />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  }
});
