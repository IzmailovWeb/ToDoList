import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type PropsTypeAddItemForm = {
    addTask: (title: string, todoListId: string) => void
    id:string
}
export const AddItemForm = (props: PropsTypeAddItemForm) => {
    const [error, setError] = useState<string | null>()
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }
    const newTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        props.addTask(newTaskTitle, props.id)
        setNewTaskTitle('')
    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={newTaskTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

