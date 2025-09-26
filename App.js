import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useState, useEffect, use } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [view, setView] = useState('lista')
  const [lembretes, setLembretes] = useState([])
  const [textoLembrete, setTextoLembrete] = useState('')

  const handleLoadLembretes = async () => {
    try {
      const lembretesSalvos = await AsyncStorage.getItem('@lembretes')
      if(lembretesSalvos !== null) {
        setLembretes(JSON.parse(lembretesSalvos))
        Alert.alert("Sucesso", "Lembretes carregados!")
      } else {
        Alert.alert("Aviso", "Nenhum lembrete salvo encontrado")
      }
    } catch (e) {
      console.error("Falha ao carregar lembretes", e)
      Alert.alert("Erro", "Não foi possível carregar os lembretes")
    }
  }
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
