import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useState, useEffect, use } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

//-------------------------------------------------------------------------------
//                  Seção de Estados (useState)
//------------------------------------------------------------------------------

  const [view, setView] = useState('lista')
  const [lembretes, setLembretes] = useState([])
  const [textoLembrete, setTextoLembrete] = useState('')


//-------------------------------------------------------------------------------
//                  Seção de Funções de Ação
//-------------------------------------------------------------------------------

// Função para CARREGAR os lembretes do AsyncStorage.
// Será chamada por um botão.
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

// Função para ADICIONAR um novo lembrete.
  const handleAddLembrete = async () => {
  // 1. Verifica se o campo de texto não está vazio.
    if(textoLembrete.trim()){
      Alert.alert("Erro", "O campo lembrete não pode estar vazio")
      return
    }
    
  // 2. Cria um novo objeto de lembrete com um ID único.
  const novoLembrete = {
    id: Date.now().toString(),
    texto: textoLembrete,
  }

  // 3. Adiciona o novo lembrete à lista existente.
  constlistaAtualizada = [...lembretes, novoLembrete]
  setLembretes(listaAtualizada)

  // 4. SALVA a lista atualizada no AsyncStorage.
  try {
    await AsyncStorage.setItem("@lembretes", JSON.stringify(listaAtualizada));
  } catch (e) {
      console.error("Falha ao salvar o lembrete.", e);
  }

  // 5. Limpa o campo do formulário e volta para a tela de lista.
    setTextoLembrete('');
    setView('lista');
  };

// Função para DELETAR um lembrete.
  const handleDeleteLembrete = async (id) => {
  // 1. Filtra a lista, mantendo apenas os lembretes com ID diferente do que foi passado.
    const listaAtualizada = lembretes.filter(lembrete => lembrete.id !== id);
    setLembretes(listaAtualizada);

  // 2. SALVA a nova lista (sem o item deletado) no AsyncStorage.
    try {
      await AsyncStorage.setItem('@lembretes', JSON.stringify(listaAtualizada));
    } catch (e) {
      console.error("Falha ao deletar o lembrete.", e);
    }
  };


//-------------------------------------------------------------------------------
//       Seção da Interface Visual (JSX com Renderização Condicional)
//-------------------------------------------------------------------------------
             
  return (
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Meus Lembretes</Text>
         {view === 'lista' ? (
  // SE a variável de estado "view" for 'lista', MOSTRE ISTO:
          <View>
            <View style={styles.botoesMenu}>
              {/* Botão para ir para a tela de formulário */}
              <TouchableOpacity style={styles.addButton} onPress={() => setView('formulario')}>
                    <Text style={styles.buttonText}>Adicionar Novo Lembrete</Text>
                </TouchableOpacity>

              {/* Botão para carregar os lembretes salvos */}
               <TouchableOpacity style={styles.loadButton} onPress={handleLoadLembretes}>
                    <Text style={styles.buttonText}>Carregar Salvos</Text>
                </TouchableOpacity>
            </View>








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
