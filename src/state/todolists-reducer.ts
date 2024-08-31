import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id:string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FIlTER'
    id: string
    filter: FilterValueType
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export  const removeTodolistAC = (todolistId1:string):RemoveTodolistActionType =>{
    return {type: 'REMOVE-TODOLIST', id: todolistId1}
}
export const addTodolistAC = (title:string,):AddTodolistActionType =>{
    return {type: 'ADD-TODOLIST', title,id:v1()}}
export const changeTodolistTitleAC = (todolistId1:string, newTodoListTitle:string):ChangeTodolistTitleActionType =>{
    return {type:'CHANGE-TODOLIST-TITLE' , id: todolistId1, title: newTodoListTitle}
}
export const changeTodolistFilterAC = (todolistId2:string, newTodoListFilter:FilterValueType):ChangeTodolistFilterActionType =>{
    return{type: 'CHANGE-TODOLIST-FIlTER', id: todolistId2, filter: newTodoListFilter}
}

const initialState: Array<TodoListsType>  = []
export const todolistsReducer = (state: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return ([...state, {id: action.id, title: action.title, filter: 'all'}])

        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title

            }
            return [...state]
        }
        case'CHANGE-TODOLIST-FIlTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter

            }
            return [...state]
        }
        default:
            return state
    }
}