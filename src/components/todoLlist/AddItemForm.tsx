import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Fab, TextField, TextFieldVariants} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export type PropsTypeAddItemForm = {
    addItem: (title: string) => void
    variant:TextFieldVariants

}
export const AddItemForm = (props: PropsTypeAddItemForm) => {
    const [error, setError] = useState<string | null>()
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const newTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        props.addItem(newTaskTitle)
        setNewTaskTitle('')
    }

    return (
        <div>
            <TextField  color={'primary'} variant={props.variant}  size={"small"} value={newTaskTitle}
                   onChange={newTaskTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ""}
            />
            <Fab onClick={addTask} color="primary" aria-label="add" size={'small'}>
                <AddIcon />
            </Fab>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

