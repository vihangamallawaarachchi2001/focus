// app/index.tsx
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { Task, useDeleteTaskHook, useGetAllTasksHook } from '@/hooks/useOpenDatabaseHook'
import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import Header from '@/components/Header'

const Home = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {

    loadTasks()
  }, [])

  const loadTasks = async () => {
    const fetchedTasks = await useGetAllTasksHook()
    if(fetchedTasks !== null){
      setTasks(fetchedTasks)
    }
  }
  
  const handleDeleteTask = async (id: number) => {
    await useDeleteTaskHook(id)
    loadTasks()
  }


  return (
    <LinearGradient
      colors={['#f3e7ff', '#f8f4ff', '#ffffff']}
      className="flex-1"
    >
      <Header />
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-between items-center mb-6 mt-4">
          <Text className="text-3xl font-bold text-purple-900">My Tasks</Text>
          <Text className="text-gray-500">{format(new Date(), 'MMM dd, yyyy')}</Text>
        </View>

        <View className="mb-24">
          {tasks.length > 0 ? tasks.map((task) => (
            <TouchableOpacity 
              key={task.id}
              className="bg-white p-4 rounded-2xl mb-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-lg font-semibold text-gray-800 mb-1">
                    {task.name}
                  </Text>
                  {task.description && (
                    <Text className="text-gray-500 text-sm mb-2">
                      {task.description}
                    </Text>
                  )}
                  <View className="flex-row items-center gap-3">
                    <View className={`px-3 py-1 rounded-full ${task.completed ? 'bg-green-100' : 'bg-purple-100'}`}>
                      <Text className={`text-sm ${task.completed ? 'text-green-600' : 'text-purple-600'}`}>
                        {task.completed ? 'Completed' : 'In Progress'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <Link href={`/${task.id}`} asChild>
                  <TouchableOpacity className="p-2">
                    <MaterialIcons name="edit" size={20} color="#7F56D9" />
                  </TouchableOpacity>
                  </Link>
                  <TouchableOpacity className="p-2" onPress={() => handleDeleteTask(task.id)}>
                    <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )) : (
            <View className="items-center justify-center py-20">
              <MaterialIcons name="assignment" size={64} color="#e9d5ff" />
              <Text className="text-gray-400 text-lg mt-4">No tasks found</Text>
              <Text className="text-gray-400 text-center mt-2">
                Tap the + button below to create your first task
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Link href='/AddTask' asChild>
        <TouchableOpacity className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-purple-600 items-center justify-center shadow-xl">
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  )
}

export default Home