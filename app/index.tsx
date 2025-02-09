import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useDeleteUser, useGetAllUsers, useGetProfile, useInsertProfile } from "@/hooks/useOpenDatabaseHook";
import useStore from "@/store/userStore";


export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const setUser = useStore((state) => state.setUser);

  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  }

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await useInsertProfile(formData.name, formData.email, formData.password);
      if (response) {
        setUser(formData); 
        router.replace("/Home");
      }
      console.log(formData);
      console.log(response);
    } catch (error) {
      
    }
  }

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await useGetProfile(); 

        if (user) {
          setUser(user);
          router.replace("/Home");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  if (loading) return (
    <LinearGradient
      colors={['#f3e7ff', '#f8f4ff', '#ffffff']}
      className="flex-1"
    >
    <View className="flex-1 items-center justify-center">
      <Image 
            source={require("../assets/images/create-account.png")} 
            className="w-72 h-72"
            resizeMode="contain"
          />
    </View>
    </LinearGradient>
  ); 
  

  return (
    <LinearGradient
      colors={['#f3e7ff', '#f8f4ff', '#ffffff']}
      className="flex-1"
    >
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="items-center mt-10">
          <Image 
            source={require("../assets/images/create-account.png")} 
            className="w-72 h-72"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-purple-900 mt-4">
            Create Account
          </Text>
          <Text className="text-gray-600 text-center mt-2 mb-8">
            Let's get started by filling out the form below
          </Text>
        </View>

        {/* Form Section */}
        <View className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-gray-600 mb-2 font-medium">Full Name</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
              <MaterialIcons name="person-outline" size={20} color="#6b7280" />
              <TextInput
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                className="flex-1 ml-3 text-gray-700"
              />
            </View>
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-gray-600 mb-2 font-medium">Email Address</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
              <MaterialIcons name="email" size={20} color="#6b7280" />
              <TextInput
                placeholder="john@example.com"
                placeholderTextColor="#9ca3af"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                className="flex-1 ml-3 text-gray-700"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-8">
            <Text className="text-gray-600 mb-2 font-medium">Password</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
              <MaterialIcons name="lock-outline" size={20} color="#6b7280" />
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                className="flex-1 ml-3 text-gray-700"
                secureTextEntry={secureTextEntry}
              />
              {secureTextEntry ? <MaterialIcons name="visibility-off" size={20} color="#6b7280" onPress={handleSecureTextEntry} /> : <MaterialIcons name="visibility" size={20} color="#6b7280" onPress={handleSecureTextEntry} />}
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity className="mb-6" onPress={handleSubmit}>
            <LinearGradient
              colors={['#7F56D9', '#9E77ED']}
              className="rounded-xl py-4 items-center shadow-lg"
            >
              <Text className="text-white font-bold text-lg">Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>



          
        </View>
      </ScrollView>

      {/* Decorative Elements */}
      <View className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -m-8" />
      <View className="absolute bottom-20 left-0 w-16 h-16 bg-purple-100 rounded-full -m-8" />
    </LinearGradient>
  );
}