import React from 'react';
import {FilterType, TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId:number) => void
    changeFilter: (filterVal:FilterType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksElements = props.tasks.map((task: TaskType) => {
        return <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={()=>props.removeTask(task.id)}>x</button>
        </li>
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;