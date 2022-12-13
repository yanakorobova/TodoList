import React from 'react';
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filterVal: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, todoListId: string) => void
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const changeTaskTitle = (title: string) => props.changeTodoListTitle(props.id, title)
    const tasksElements = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id, props.id)
            const changeTaskStatus = () => props.changeTaskStatus(task.id, props.id)
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, props.id, title)

            return <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>

        })
        : <span>List is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodoList = () => props.removeTodoList(props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
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