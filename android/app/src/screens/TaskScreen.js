import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, Modal, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState({ title: '', description: '' });
  const [refreshing, setRefreshing] = useState(false);

  const addTask = () => {
    if (input.title.trim()) {
      const newTask = { id: Date.now(), ...input, completed: false };
      setTasks([newTask, ...tasks]);
      setInput({ title: '', description: '' });
      setModalVisible(false);
    }
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const toggleComplete = (id) => setTasks(
    tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
  );
  const onRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 500); };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, item.completed && styles.completed]}
      onLongPress={() => deleteTask(item.id)}
      onPress={() => toggleComplete(item.id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTask}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyText}>No tasks yet</Text></View>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput placeholder="Title" style={styles.input} value={input.title} onChangeText={text => setInput({ ...input, title: text })} />
            <TextInput placeholder="Description" style={styles.input} value={input.description} onChangeText={text => setInput({ ...input, description: text })} />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={addTask}><Text style={styles.add}>Add</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  taskCard: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10,
    marginBottom: 12, elevation: 3
  },
  completed: { backgroundColor: '#d4edda', borderLeftWidth: 5, borderLeftColor: 'green' },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#555' },
  fab: {
    position: 'absolute', bottom: 24, right: 24, backgroundColor: '#4CAF50',
    width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 5,
  },
  modalContainer: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 12, fontSize: 16, padding: 4 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  cancel: { color: '#f44336', fontWeight: 'bold' },
  add: { color: '#4CAF50', fontWeight: 'bold' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#999' },
});