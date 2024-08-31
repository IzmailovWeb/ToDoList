import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]


    const endState = todolistsReducer(startState,removeTodolistAC(todolistId1) )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = 'New Todolist'


    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]


    const endState = todolistsReducer(startState,addTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')

})
test("correct todolist should change it's name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = 'New Todolist'


    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState,changeTodolistTitleAC(todolistId1,newTodoListTitle))

    expect(endState[1].title).toBe('What to buy')
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].filter).toBe('all')

})
test("correct todolist should change filter", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListFilter: FilterValueType = 'active'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]


    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,newTodoListFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodoListFilter)
})