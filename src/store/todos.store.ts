// Store para lostodos 
import { create } from 'zustand'
import { TypeTodo, todosList } from '../interfaces/interfacesTodos';
import { devtools, persist } from 'zustand/middleware';

interface TodoState {
    todosPending: todosList[];
    todosFinished: todosList[];
    inputTodo: string;
    theme_todos: string;
    controlThemeTodos: boolean;
    controlTodosPending: boolean;
    controlTodosFinished: boolean;
    
    getThemeTodos: () => string;
    changeStateAllTodos: (todos: todosList[], stateTodo: boolean, typeTodo: TypeTodo) => void;
    changeTheme: (controlTheme: boolean) => void;
    addTodo: (todo: todosList, typeTodo: TypeTodo) => void;
    deleteTodo: (indexTodo: number, typeTodo: TypeTodo) => void;
    changeStatusTodo: (idTodo: number, typeTodo: TypeTodo) => void;
    changeControlTodos: (valueControl: boolean, typeTodo: TypeTodo) => void;
    toggleTodos: (typeTodo: TypeTodo) => void;
    getTotalTodosActive: (typeTodo: TypeTodo) => number;
}


export const useTodosStore = create<TodoState>()(
    // Con la instrucción persist se guarda el store en localStore
    devtools(
        persist(
            (set, get) => ({
                todosPending: [],
                todosFinished: [],
                inputTodo: '',
                theme_todos: 'light',
                controlThemeTodos: false,
                controlTodosPending: false,
                controlTodosFinished: false,

                getThemeTodos: () => {
                    return get().theme_todos;
                },

                changeStateAllTodos: (todos: todosList[], stateTodo: boolean, typeTodo: TypeTodo) => {
                    const tempTodos = todos.map(itemTodo => {
                        return { ...itemTodo, stateTodo }
                    });
                    (typeTodo === 'Pending')
                        ? set(({ todosPending: tempTodos }))
                        : set(({ todosFinished: tempTodos }))
                },

                changeTheme: (controlTheme: boolean) => { 
                    set ( { controlThemeTodos: controlTheme })  
                    set ({ theme_todos: get().controlThemeTodos ? 'dark' : 'light' }) 
                },
                
                addTodo: (todo: todosList, typeTodo: TypeTodo) => {
                    (typeTodo === 'Pending')
                        ? set(state => ({ todosPending: [...state.todosPending, todo] }))
                        : set(state => ({ todosFinished: [...state.todosFinished, todo] }))
                },

                deleteTodo: (indexTodo: number, typeTodo: TypeTodo) => {
                    let todosTemp: todosList[];
                    switch (typeTodo) {
                        case 'Pending':
                            todosTemp = [...get().todosPending];
                            todosTemp.splice(indexTodo, 1);
                            set(({ todosPending: [...todosTemp] }))
                            break;
                        case 'Completed':
                            todosTemp = [...get().todosFinished];
                            todosTemp.splice(indexTodo, 1);
                            set(({ todosFinished: [...todosTemp] }))
                            break;
                    }
                },

                changeStatusTodo: (idTodo: number, typeTodo: TypeTodo) => {
                    let todoTemp: todosList[];
                    switch (typeTodo) {
                        case 'Pending':
                            todoTemp = [...get().todosPending];
                            todoTemp[idTodo].stateTodo = !todoTemp[idTodo].stateTodo;
                            set(({ todosPending: [...todoTemp] }))
                            set(({ controlTodosPending: false }))
                            break;
                        case 'Completed':
                            todoTemp = [...get().todosFinished];
                            todoTemp[idTodo].stateTodo = !todoTemp[idTodo].stateTodo;
                            set(({ todosFinished: [...todoTemp] }))
                            set(({ controlTodosFinished: false }))
                            break;
                    }
                },

                changeControlTodos: (valueControl: boolean, typeTodo: TypeTodo) => {
                    (typeTodo === 'Pending')
                        ? set({ controlTodosPending: valueControl })
                        : set({ controlTodosFinished: valueControl })
                },

                // Obtener total de tareas pendinetes o finalizadas.
                getTotalTodosActive: (typeTodo: TypeTodo) => {
                    let totTodosType: number = 0;
                    switch (typeTodo) {
                        case 'Completed':
                            totTodosType = get().todosFinished.reduce((prev, curr) => {
                                if (curr.stateTodo) {
                                    prev++;
                                }
                                return prev;
                            }, 0)
                            break;
                        case 'Pending':
                            totTodosType = get().todosPending.reduce((prev, curr) => {
                                if (curr.stateTodo) {
                                    prev++;
                                }
                                return prev;
                            }, 0)
                            break;
                    }
                    return totTodosType;
                },

                toggleTodos: (typeTodo: TypeTodo) => {
                    if (typeTodo === 'Pending') {
                        const todosPendinChecked: todosList[] = get().todosPending.filter(todo => todo.stateTodo === true)
                            .map(todo => {
                                return { ...todo, stateTodo: false, typeTodo: 'Completed' }
                            });
                        const todosPendinUnChecked: todosList[] = get().todosPending.filter(todo => todo.stateTodo === false);
                        set({ todosFinished: [...get().todosFinished, ...todosPendinChecked] });
                        set({ todosPending: [...todosPendinUnChecked] });
                        set({ controlTodosPending: false })
                    }

                    if (typeTodo === 'Completed') {
                        const todosFinishChecked: todosList[] = get().todosFinished.filter(todo => todo.stateTodo === true)
                            .map(todo => {
                                return { ...todo, stateTodo: false, typeTodo: 'Pending' }
                            });
                        const todosFinishUnChecked: todosList[] = get().todosFinished.filter(todo => todo.stateTodo === false);
                        set({ todosPending: [...get().todosPending, ...todosFinishChecked] });
                        set({ todosFinished: [...todosFinishUnChecked] });
                        set({ controlTodosFinished: false })
                    }
                },

            }), { name: 'tasks-javv' }
        )
    )
)