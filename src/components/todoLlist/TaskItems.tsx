import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";
import {EditabeSpan} from "./EditabeSpan";
import {Button, Checkbox, Icon} from '@mui/material';
import {green} from '@mui/material/colors';
import {Delete} from "@mui/icons-material";

export type PropsTypeTodoListTaskItems = {
    tasks: TaskType[]
    removeTasks: (id: string, todoListId: string) => void
    id: string
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    onChangeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}
export const TaskItems = (props: PropsTypeTodoListTaskItems) => {
    return (
        <ul style={{padding:"0"}}>{props.tasks.map((t) => {
            const removeTask = () => props.removeTasks(t.id, props.id)
            const onChageTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }
            const onChangeTaskTitle = (newTitle: string) => {
                props.onChangeTaskTitle(t.id, newTitle, props.id)
            }

            return (

                <li style={{listStyle:"none"} } key={t.id} className={t.isDone ? 'is-Done' : ''}>
                    <Checkbox
                        checked={t.isDone}
                        onChange={onChageTaskStatus}

                    />
                    <EditabeSpan title={t.title} onChange={onChangeTaskTitle}/>
                    <Button onClick={removeTask}>
                        <Delete/>
                    </Button>
                </li>
            )
        })
        }
        </ul>
    );
};

