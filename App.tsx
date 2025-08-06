import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>
        ToDo Task Manager
      </Text>
      <AddTask onTaskAdded={refreshTasks} />
      <TaskList refresh={refreshKey} />
    </SafeAreaView>
  );
}
