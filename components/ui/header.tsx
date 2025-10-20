import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

interface HeaderProps {
    title: string;
    markAll: () => void;
    addTodoList: () => void;
    isMarkMode: boolean;
    onCancelMarkMode?: () => void;
    onDeleteSelected?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, markAll, addTodoList: addTodo, isMarkMode, onCancelMarkMode, onDeleteSelected   }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={styles.side}>
            {isMarkMode ? 
                <TouchableOpacity style={styles.button} onPress={onCancelMarkMode}>
                    <Entypo name="cross" size={24} color="white" />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.button} onPress={markAll}>
                    <Text style={styles.mark}>Mark</Text>
                </TouchableOpacity> }
            </View>

            <View style={styles.center}>
                <Text style={styles.title}>{title}</Text>
            </View>     

            <View style={styles.side}>
            {isMarkMode ?
                <TouchableOpacity style={styles.button} onPress={onDeleteSelected}>
                    <Feather name="trash-2" size={24} color="white"/>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Entypo name="add-to-list" size={24} color="white" />
                </TouchableOpacity> }
            </View>

        </View>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#312e2eff',
    },
    container: {
        backgroundColor: '#312e2eff',
        height: 42,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
        },

        side: {
            width: 100,
            flexDirection: 'row',
            justifyContent: 'center'
        },

        center:{
            flex: 1,
            alignItems: 'center',
        },

        button: {
            padding: 8,
            borderWidth: 0.3,
            borderRadius: 30,
            borderColor: "gray",
        },

        //Items
        title: {
            color: "#8c0b0b",
            fontSize: 34,
            fontWeight: 'bold',
            fontFamily: 'Milker-Regular',
        },

        mark: {
            color: 'white',
            fontSize: 16,
        }

    });