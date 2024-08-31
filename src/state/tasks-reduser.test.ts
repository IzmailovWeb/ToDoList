import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reduser";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test("correct task should be deleted from correct array ", () => {
    const startState: TaskStateType = {

        "todolistId1": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ],
        "todolistId2": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ]

    }
    const action = removeTaskAC("todolistId1", '2')
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState["todolistId1"].every(t => t.id !== '2')).toBeTruthy()
})
test("correct task should be added to correct array ", () => {
    const startState: TaskStateType = {

        "todolistId1": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ],
        "todolistId2": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ]

    }
    const action = addTaskAC('redux', "todolistId1")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"] [0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe('redux');
    expect(endState["todolistId1"] [0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ],
        "todolistId2": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ]
    }
    const action = changeTaskStatusAC("todolistId2", '1', false)
    const endState = tasksReducer(startState, action)


    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ],
        "todolistId2": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ]
    }
    const action = changeTaskTitleAC("todolistId2", '1', "redux")
    const endState = tasksReducer(startState, action)


    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].title).toBe("redux");
})
test('new property with new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ],
        "todolistId2": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ]
    }
    const action = addTodolistAC("title no matter" )
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")
    if (!newKey){
        throw Error("new key should be added")
    }


    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);

})

test('property with todolistId should be deleted' , () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ],
        "todolistId2": [
            {id: '1', title: "css", isDone: true},
            {id: '2', title: "js", isDone: true},
            {id: '3', title: "react", isDone: true}
        ]
    }
    const action = removeTodolistAC("todolistId2" )
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)


    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined()

})