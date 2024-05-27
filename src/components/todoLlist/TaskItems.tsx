import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";
export type PropsTypeTodoListTaskItems ={
    tasks: TaskType[]
    removeTasks: (id: string, todoListId: string) => void
    id:string
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}
export const TodoListTaskItems = (props:PropsTypeTodoListTaskItems) => {
    return (
        <div>{props.tasks.map((t) => {
            const removeTask = () => props.removeTasks(t.id, props.id)
            const onChageHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }

            return (
                <li key={t.id} className={t.isDone ? 'is-Done' : ''}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChageHandler}

                    />
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        }
        </div>
    );
};

