// components/Header.tsx
import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import useStore from '@/store/userStore'
import { LinearGradient } from 'expo-linear-gradient'

const Header = () => {
    const user = useStore((state) => state.user)
  return (
    <LinearGradient
      colors={['#7F56D9', '#9E77ED']}
      className="pt-16 pb-8 px-6 rounded-b-3xl shadow-lg"
    >
      <View className="flex-row items-center gap-4 px-4">
        <View className="ml-2 w-12 h-12 bg-purple-200 rounded-full items-center justify-center shadow-md">
          <Text className=" text-purple-800 font-bold text-xl rounded-full  p-2">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Text>
        </View>
        <View className='flex ml-2 items-start justify-center'>
          <Text className="text-white text-sm opacity-90">Welcome back</Text>
          <Text className="text-white text-xl font-semibold mt-1">
            {user?.name || 'Guest User'}

          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Header