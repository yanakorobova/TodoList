import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'Js', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const changeFilter = (filterVal: FilterType) => {
        setFilter(filterVal)
    }
    const filterTasks = ():TaskType[] => {
        return filter === 'all' ? tasks : filter === 'completed' ? tasks.filter((task) => task.isDone) : tasks.filter((task) => !task.isDone)
    }
    const filteredTasks = filterTasks()


    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title='What to learn'
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
