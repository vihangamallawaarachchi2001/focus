import { Stack } from "expo-router";
import "../global.css";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';
import { createDbIfNeeded } from "@/hooks/useOpenDatabaseHook";
export default function RootLayout() {
  
  return (
    <SQLiteProvider databaseName="focus.db" onInit={createDbIfNeeded}>
      <Stack screenOptions={{ headerShown: false, headerBlurEffect: 'dark', headerBackVisible: true }}  />
    </SQLiteProvider>
  )

}
