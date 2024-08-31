import React from 'react';
import {FilterValueType} from "../../App";
import {Button, ButtonGroup} from "@mui/material";



export type PropsTypeFilterForm = {
    id: string
    filter: FilterValueType
    changeFilter: (value: FilterValueType, todoListid: string) => void
}
export const FilterForm = (props: PropsTypeFilterForm) => {
    const onAllClickHandler = () => props.changeFilter('all', props.id)

    const onActiveClickHandler = () => props.changeFilter('active', props.id)

    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)



    return (
            <ButtonGroup variant='text' aria-label="Basic button group">
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'} onClick={onCompletedClickHandler}>Completed</Button>
            </ButtonGroup>
    );
};

