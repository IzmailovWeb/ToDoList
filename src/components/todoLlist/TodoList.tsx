import React from 'react';
import {FilterValueType} from "../../App";
import {AddItemForm} from "./AddItemForm";
import {TaskItems} from "./TaskItems";
import {TodoListTitle} from "./TodoListTitle";
import {FilterForm} from "./FilterForm";


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
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListid: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    onChangeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    calculateCompletionTask:(todolistId:string) => number

    filter: FilterValueType
}

export const TodoList = (props: TodoListPropsType) => {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChange = (newTitle:string)=>{
        props.changeTodoListTitle(newTitle,props.id)
    }



    return (

        <div>
            <TodoListTitle
                calculateCompletionTask = {props.calculateCompletionTask}
                onChange={onChange}
                title={props.title}
                id={props.id}
                removeTodoList={props.removeTodoList}
            />
            <AddItemForm
                variant='standard'
                addItem={addTask}
            />
            <TaskItems
                onChangeTaskTitle={props.onChangeTaskTitle}
                tasks={props.tasks}
                removeTasks={props.removeTasks} id={props.id}
                changeTaskStatus={props.changeTaskStatus}
            />
            <FilterForm
                id={props.id}
                filter={props.filter}
                changeFilter={props.changeFilter}
            />
        </div>

    );
};

