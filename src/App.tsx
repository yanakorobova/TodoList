import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'Js', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const addTask = (title: string) => {
        setTasks([...tasks, {id: v1(), title, isDone: false}])
    }
    const changeFilter = (filterVal: FilterType) => {
        setFilter(filterVal)
    }
    const filterTasks = (): TaskType[] => {
        return filter === 'all' ? tasks : filter === 'completed' ?
            tasks.filter((task) => task.isDone) : tasks.filter((task) => !task.isDone)
    }
    const filteredTasks = filterTasks()
    const changeTaskStatus = (taskId: string) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t,isDone: !t.isDone} :t))
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title='What to learn'
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus = {changeTaskStatus}
                filter = {filter}
            />
        </div>
    );
}

export default App;
