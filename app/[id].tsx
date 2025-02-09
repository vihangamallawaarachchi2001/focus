import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getTaskById, Task,  useUpdateTaskHook } from '@/hooks/useOpenDatabaseHook'
import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import Header from '@/components/Header'

const EditTask = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const [task, setTask] = useState<Task>({
    id: 0,
    name: '',
    description: '',
    completed: false
  })
  
  const handleUpdateTask = async () => {
    await useUpdateTaskHook(task.id, task.name, task.description, task.completed)
    router.push('/Home')
  }


  useEffect(() => {
    const fetchTask = async () => {
      const result = await getTaskById(Number(id))
      if (result !== null) {
        setTask(result as Task)
      }
    }
    fetchTask()
  }, [id])

  const handleInputChange = (text: string, field: keyof Task) => {
    setTask(prev => ({
      ...prev,
      [field]: text
    }))
  }

  const toggleStatus = () => {
    setTask(prev => ({
      ...prev,
      completed: !prev.completed
    }))
  }

  return (
    <LinearGradient
      colors={['#f3e7ff', '#f8f4ff', '#ffffff']}
      className="flex-1"
    >
      <Header />
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-between items-center mb-6 mt-4">
          <Text className="text-3xl font-bold text-purple-900">Edit Task</Text>
          <Text className="text-gray-500 font-medium">
            {format(new Date(), 'MMM dd, yyyy')}
          </Text>
        </View>

        <View className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          {/* Task Name Input */}
          <View className="mb-6">
            <Text className="text-purple-900 font-medium mb-2">Task Name</Text>
            <View className="flex-row items-center border border-purple-100 rounded-xl px-4 py-3 bg-purple-50">
              <MaterialIcons name="title" size={20} color="#7F56D9" />
              <TextInput
                onChangeText={text => handleInputChange(text, 'name')}
                placeholder="Enter task name"
                placeholderTextColor="#9CA3AF"
                value={task.name}
                className="flex-1 ml-3 text-purple-900 font-medium"
              />
            </View>
          </View>

          {/* Task Description Input */}
          <View className="mb-6">
            <Text className="text-purple-900 font-medium mb-2">Description</Text>
            <View className="flex-row items-start border border-purple-100 rounded-xl px-4 py-3 bg-purple-50 h-32">
              <MaterialIcons 
                name="description" 
                size={20} 
                color="#7F56D9" 
                style={{ marginTop: 4 }} 
              />
              <TextInput
                multiline
                value={task.description}
                numberOfLines={4}
                onChangeText={text => handleInputChange(text, 'description')}
                placeholder="Enter task description..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-3 text-purple-900 font-medium"
              />
            </View>
          </View>

          {/* Status Toggle */}
          <View className="mb-8">
            <Text className="text-purple-900 font-medium mb-2">Status</Text>
            <TouchableOpacity 
              onPress={toggleStatus}
              className="flex-row items-center border border-purple-100 rounded-xl px-4 py-3 bg-purple-50"
            >
              <MaterialIcons 
                name={task.completed ? "check-circle" : "pending-actions"} 
                size={20} 
                color="#7F56D9" 
              />
              <Text className="text-purple-900 font-medium ml-3">
                {task.completed ? 'Completed' : 'In Progress'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View className="flex-col space-y-4">
            <TouchableOpacity
              onPress={handleUpdateTask}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <LinearGradient
                colors={['#7F56D9', '#9E77ED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 items-center justify-center flex-row space-x-2"
              >
                <MaterialIcons name="save" size={20} color="white" />
                <Text className="text-white font-bold text-lg">Update Task</Text>
              </LinearGradient>
            </TouchableOpacity>

           
          </View>
        </View>

        {/* Decorative Elements */}
        <View className="absolute top-40 right-0 w-24 h-24 bg-purple-100 rounded-full -m-8 opacity-50" />
        <View className="absolute bottom-20 left-0 w-16 h-16 bg-purple-100 rounded-full -m-8 opacity-50" />
      </ScrollView>
    </LinearGradient>
  )
}

export default EditTask