import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/todoLlist/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/todoLlist/AddItemForm";
import {
    AppBar,
    Box,
    Button,
    Container, createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {AppRootType} from "./state/store";


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export function App() {


    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootType,Array<TodoListsType>>(state => state.todolist)

    const todoListTasks = useSelector<AppRootType,TaskStateType>(state => state.tasks)

    function removeTodoList(todoListId: string) {
        dispatch(removeTodolistAC(todoListId))
    }

    function changeTodoListFilter(value: FilterValueType, todoListsId: string) {
       dispatch(changeTodolistFilterAC(todoListsId,value))
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        dispatch(changeTodolistTitleAC(todoListId,newTitle))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(todoListId,id))
    }

    function addTask(title: string, todoListId: string) {
      dispatch(addTaskAC(title,todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {

        dispatch(changeTaskStatusAC(todoListId,taskId,isDone))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {

        dispatch(changeTaskTitleAC(todoListId,taskId,newTitle))
    }

    function calculateCompletionTask(todoListId: string,) {
        let tasks = todoListTasks[todoListId]
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter(task => task.isDone).length;
        return (completedTasks / tasks.length) * 100;
    }


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                TodoList
                            </Typography>
                            <Button color="inherit">Login</Button>

                        </Toolbar>
                    </AppBar>
                </Box>
                <Container>
                    <Grid>
                        <Paper style={{padding: "10px", display: 'inline-block', margin: "10px 0px 20px 0px"}}
                               elevation={3}>
                            <h3 style={{padding: "0", margin: '0'}}>Add TodoList</h3>
                            <AddItemForm variant={'outlined'} addItem={addTodolist}/>
                        </Paper>
                    </Grid>
                    <Grid container spacing={5}>
                        {
                            todoLists.map((tl) => {

                                let filtredTasks = todoListTasks[tl.id]
                                if (tl.filter === 'completed') {
                                    filtredTasks = filtredTasks.filter(t => t.isDone === true)
                                }
                                if (tl.filter === 'active') {
                                    filtredTasks = filtredTasks.filter(t => t.isDone === false)
                                }

                                return <Grid item>
                                    <Paper style={{padding: "20px"}} elevation={3}>
                                        <TodoList
                                            changeTodoListTitle={changeTodoListTitle}
                                            onChangeTaskTitle={changeTaskTitle}
                                            removeTodoList={removeTodoList}
                                            key={tl.id}
                                            id={tl.id}
                                            addTask={addTask}
                                            removeTasks={removeTask}
                                            title={tl.title}
                                            tasks={filtredTasks}
                                            changeFilter={changeTodoListFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            calculateCompletionTask={calculateCompletionTask}
                                        />
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </>);
}

