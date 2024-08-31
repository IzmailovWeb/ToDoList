import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
type EditabeSpanPropsType = {
    title:string
    onChange:(newTitle:string)=> void
}
export const EditabeSpan = (props:EditabeSpanPropsType) => {
    let [editMode,setEditMode] = useState(false)
    let [title,setTitle] = useState('')

    const activateEditMode = ()=>{
       setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode
        = ()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const  onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>)=>{setTitle(e.currentTarget.value)}

    return (
        editMode ?
        <TextField variant={'standard'} value={title} autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler}/>
        :
        <span onDoubleClick={activateEditMode}>{props.title}</span>)
};

