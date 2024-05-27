import React, {ChangeEvent} from 'react';
import {filterValueType} from "../App";
import AddItemForm from "./AddItemForm";
import {TodoListTaskItems} from "./TodoListTaskItems";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTodoList: (todoListId: string) => void
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: filterValueType, todoListid: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: filterValueType
}
export const TodoList = (props: TodoListPropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)

    const onActiveClickHandler = () => props.changeFilter('active', props.id)

    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodoListHandler = () => props.removeTodoList(props.id)

    const allActiveFilter = props.filter === 'all' ? "active-filter" : ''
    const ActiveFilter = props.filter === 'active' ? 'active-filter' : ''
    const completedActiveFilter = props.filter === 'completed' ? "active-filter" : ''


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <AddItemForm addTask={props.addTask} id={props.id}/>
            <TodoListTaskItems
                tasks={props.tasks}
                removeTasks={props.removeTasks} id={props.id}
                changeTaskStatus={props.changeTaskStatus}
            />

            <div>
                <button className={allActiveFilter} onClick={onAllClickHandler}>all</button>
                <button className={ActiveFilter} onClick={onActiveClickHandler}>active</button>
                <button className={completedActiveFilter} onClick={onCompletedClickHandler}>completed</button>
            </div>
        </div>

    );
};

