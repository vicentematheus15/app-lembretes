import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useState, useEffect, use } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [view, setView] = useState('lista')
  const [lembretes, setLembretes] = useState([])

  return (

    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
