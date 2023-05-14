import { useState, createContext, useContext } from "react";
import {nanoid} from 'nanoid';
import { toast } from "react-toastify";

const AppContext = createContext();

const setLocalStorage = (tasks) => {
    localStorage.setItem('ToDoList', JSON.stringify(tasks));
}
const defaultValue = JSON.parse(localStorage.getItem('ToDoList') || '[]')

export const AppProvider = ({children}) => {
  const [tasks, setTasks] = useState(defaultValue);
  const [task, setTask] = useState({
    name: '',
    completed: false
  });
  const [IsEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    const newTask = {...task, id: nanoid() }
    const newTasks = [...tasks, newTask]
    setTasks(newTasks);
    setLocalStorage(newTasks);
    toast.success('Task added to the List')
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    setLocalStorage(newTasks);
    toast.success('Task deleted successfully');
  }

  const checkTask = (id) => {
    const newTasks = tasks.map(task => {
        if(task.id === id) {
            const newTask = {...task, completed: !task.completed}
            return newTask;
        }
        return task;
    })
    setTasks(newTasks);
    setLocalStorage(newTasks);
  }

   const startEditTask = (id) => {
     const editItem = tasks.find(task => task.id === id);
     setTask(editItem);
     setIsEditing(true);
   }
   const saveEditedTask = (id) => {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex(task => task.id === id);
    newTasks[taskIndex] = task;
    setTasks(newTasks);
    setLocalStorage(newTasks);
    toast.success("Successfully edited");
    setTask({
        name: '',
        completed: false
      });
   }

    return <AppContext.Provider value={{tasks, task, setTasks, setTask, addTask, deleteTask, checkTask, startEditTask, IsEditing, setIsEditing, saveEditedTask}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}