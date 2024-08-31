import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reduser";


export type AppRootType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
        todolist: todolistsReducer,
        tasks: tasksReducer
    }
)

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store