import {TaskStateType, TodoListsType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reduser";

test("ids should be equals",()=>{
    const startTaskState:TaskStateType = {}
    const startTodolistsState:Array<TodoListsType> = []

    const acion = addTodolistAC("new todolist")

    const endTaskState = tasksReducer(startTaskState,acion)
    const endTodolistsState = todolistsReducer(startTodolistsState,acion)

    const  keys = Object.keys(endTaskState)
    const  idFromTasks = keys[0]
    const  idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(acion.id)
    expect(idFromTodolists).toBe(acion.id)

})