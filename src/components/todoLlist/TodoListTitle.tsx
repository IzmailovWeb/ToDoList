import React from 'react';
import {EditabeSpan} from "./EditabeSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



export type PropsTypeTodoListTitle = {
    title: string
    id:string
    removeTodoList: (todoListId: string) => void
    onChange:(newTitle:string)=> void
    calculateCompletionTask:(todolistId:string) => number
}
export const TodoListTitle = (props:PropsTypeTodoListTitle) => {
    const removeTodoListHandler = () => props.removeTodoList(props.id)
    let procent = props.calculateCompletionTask(props.id)
    return (
        <>
            <h3 style={{marginTop:0}}>
                <div>{procent}%</div>
                <EditabeSpan title={props.title} onChange={props.onChange}/>
                <IconButton onClick={removeTodoListHandler} color={"primary"} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </>
    );
};


