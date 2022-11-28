import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterVal: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string) => void
    filter: FilterType
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const tasksElements = props.tasks.map((task: TaskType) => {
        const removeTask = () => props.removeTask(task.id)
        const changeTaskStatus = () => props.changeTaskStatus(task.id)
        return <li key={task.id} className={task.isDone ? 'isDone':''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
            <span>{task.title}</span>
            <button onClick={removeTask}>x</button>
        </li>
    })
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim())
        } else setError('Title is required')
        setTitle('')
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        e.key === 'Enter' && addTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value.trimStart())
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onEnter}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;