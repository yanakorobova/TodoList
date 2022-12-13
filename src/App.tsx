import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid'
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterType = 'all' | 'completed' | 'active'

function App() {
    const Id1 = v1()
    const Id2 = v1()
    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: Id1, title: 'What to learn', filter: 'all'},
        {id: Id2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [Id1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [Id2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: false}
        ]
    });

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .filter(task => task.id !== taskId)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: v1(), title, isDone: false}]})
    }
    const changeFilter = (filterVal: FilterType, todoListId: string) => {
        setTodoLists(todoLists.map(list => list.id === todoListId ? {...list, filter: filterVal} : list))
    }

    const changeTaskStatus = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t)
        })
    }
    const filterTasks = (todoList: TodolistType) => {
        return todoList.filter === 'all' ? tasks[todoList.id] : todoList.filter === 'completed' ?
            tasks[todoList.id].filter((task) => task.isDone) :
            tasks[todoList.id].filter((task) => !task.isDone)
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(l => l.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }
    const addTodoList = (title: string) => {
        const IdNewList = v1()
        setTodoLists([...todoLists, {id: IdNewList, title, filter: 'all'}])
        setTasks({...tasks, [IdNewList]: []})
    }
    const changeTaskTitle = (taskId: string, todoListId: string, title: string) => {
        setTasks({
            ...tasks, [todoListId]:
                tasks[todoListId].map(t => taskId === t.id ? {...t, title} : t)
        })
    }
    const changeTodoListTitle = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(l => l.id === todoListId ? {...l, title} : l))
    }
    const todoListComponents = todoLists.map((todoList) => {
        const filteredTasks = filterTasks(todoList)
        return <TodoList
            key={todoList.id}
            id={todoList.id}
            tasks={filteredTasks}
            title={todoList.title}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={todoList.filter}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
        />
    })
    return (
        <div className="App">
            {/* <h3>Add new TodoList</h3>*/}
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}


export default App;
