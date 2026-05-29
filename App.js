import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
 const [task,setTask]=useState('');
 const [todos,setTodos]=useState([]);
 useEffect(()=>{loadTodos();},[]);
 useEffect(()=>{saveTodos();},[todos]);
 const loadTodos=async()=>{const d=await AsyncStorage.getItem('todos'); if(d) setTodos(JSON.parse(d));};
 const saveTodos=async()=>{await AsyncStorage.setItem('todos',JSON.stringify(todos));};
 const addTodo=()=>{if(!task.trim()) return; setTodos([{id:Date.now().toString(),text:task,completed:false},...todos]); setTask('');};
 const toggle=(id)=>setTodos(todos.map(t=>t.id===id?{...t,completed:!t.completed}:t));
 const del=(id)=>setTodos(todos.filter(t=>t.id!==id));
 return (<View style={styles.container}><Text style={styles.title}>Todo</Text><View style={styles.row}><TextInput style={styles.input} value={task} onChangeText={setTask} placeholder='New task'/><TouchableOpacity style={styles.btn} onPress={addTodo}><Text style={{color:'#fff'}}>Add</Text></TouchableOpacity></View><FlatList data={todos} keyExtractor={i=>i.id} renderItem={({item})=><TouchableOpacity onPress={()=>toggle(item.id)} style={styles.item}><Text style={item.completed?styles.done:null}>{item.text}</Text><Text onPress={()=>del(item.id)}>🗑️</Text></TouchableOpacity>}/></View>);
}
const styles=StyleSheet.create({container:{flex:1,padding:20,paddingTop:60},title:{fontSize:30,fontWeight:'bold'},row:{flexDirection:'row'},input:{flex:1,borderWidth:1,padding:10},btn:{backgroundColor:'blue',padding:10},item:{flexDirection:'row',justifyContent:'space-between',padding:15,borderBottomWidth:1},done:{textDecorationLine:'line-through'}});
