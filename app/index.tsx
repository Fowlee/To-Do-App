
import { Header } from '@/components/ui/header';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




interface Todo{
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState('');
  const [isMarkMode, setIsMarkMode] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos))
        }
      }catch (error) {
        console.log("Error loading todos:", error);
      }
    }
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos))
      }catch (error) {
        console.log("Error saving todos:", error);
      }
    };
    
    saveTodos();
  }, [todos]);


function markAll() {
  console.log("Mark all Pressed")
  setIsMarkMode(true);
}

function onCancelMarkMode() {
  console.log("Cancel Mark Mode Pressed")
  setIsMarkMode(false);
}

function addTodoList() {
  setModalVisible(true);
  console.log("Add To-Dolist Pressed")
}
function onDeleteSelected() {
  const updatedTodos = todos.filter(todo => !selectedTodos.includes(todo.id))

  setTodos(updatedTodos);
  setSelectedTodos([]);
  setIsMarkMode(false);
  console.log("Shits getting deleted")
}

function addTodo() {
  console.log("Add To-Do from modal Pressed")
  const addTodoToList = (): void => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        title: todoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };
      addTodoToList();
      console.log(todoText);
      setModalVisible(false);
}

const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed: !todo.completed}
        }
        return todo;
      })
    );
}

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="To-Do!" markAll={markAll} onCancelMarkMode={onCancelMarkMode} addTodoList={addTodoList} onDeleteSelected={onDeleteSelected} isMarkMode={isMarkMode}></Header>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          {todos.map((todo: Todo)=>(
            <View
            style={styles.todoItem}
             key={todo.id}>
              <Text style={styles.todoItemText}>
                {todo.title} 
                 </Text>
                 {isMarkMode ?
                  <TouchableOpacity
                  onPress={() => {
                    if (selectedTodos.includes(todo.id)){
                      setSelectedTodos(selectedTodos.filter(id => id !== todo.id))
                    }else {
                      setSelectedTodos([...selectedTodos, todo.id])
                    }
                  }}
                  >
                    {selectedTodos.includes(todo.id) ?
                      <Feather name="check-square" size={24} color="#8c0b0b"/>
                      :
                      <Feather name="square" size={24} color="#8c0b0b" />
                 }
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
                    {todo.completed ? 
                      <Feather name="check-circle" size={24} color="#8c0b0b"/>
                      : 
                      <Feather name="circle" size={24} color="#8c0b0b"/>}
                  </TouchableOpacity> 
                    
                }
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType='fade'
        presentationStyle='overFullScreen'
        transparent={true}
        visible={modalVisible}
        onRequestClose= {() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
              <TouchableOpacity
              style={{alignSelf: "flex-start", marginBottom: 44}}
              onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="close" size={24} color="#8c0b0b" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Write Your Todos!</Text>
              <View style={styles.todoWriteContainer}>
                <TextInput
                style={styles.modalTextInput}
                placeholder="Write a todo.."
                placeholderTextColor={"white"}
                value={todoText}
                onChangeText={setTodoText}
                />
                <TouchableOpacity
                style={styles.addTodo}
                onPress={() => addTodo()}
                >
                  <Text style={styles.buttonText}>Add To-Do!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 16,
    },
    scrollViewContainer:{
      flex: 1,
    },
    todoItem:{
      backgroundColor: '#312e2eff',
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    todoItemText:{
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    modalOverlay: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      },

    modalContent: {
        width: "85%",
        height: "70%", 
        backgroundColor: '#312e2eff',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingBottom: 36,
        paddingTop: 16,
        justifyContent: "space-between",
        
      },
      modalTitle: {
        fontSize: 38,
        fontWeight: 'bold',
        color: "#8c0b0b",
        alignSelf: "center",
      },
      modalTextInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,  
        paddingHorizontal: 10,
        color: 'white',
  
    },

    //Im deep in the modal rabbit hole help me please :)
    todoWriteContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginTop: 44,
    },

    addTodo: {
      backgroundColor: "#8c0b0b",
      alignSelf: "center",
      padding: 24,
      borderRadius: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.7,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },

    //It goes deeper
    keyboardScrollView: {
      flex: 1,
    },
});

