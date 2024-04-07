// Store para lostodos 
import { create } from 'zustand'
import { TypeTodo, todosList } from '../interfaces/interfacesTodos';
import { devtools, persist } from 'zustand/middleware';

interface TodoState {
    listTodos: todosList[];
    inputTodo: string;
    theme_todos: string;
    controlThemeTodos: boolean;
    controlTodosPending: boolean;
    controlTodosFinished: boolean;

    getThemeTodos: () => string;
    changeTheme: (controlTheme: boolean) => void;
    changeStateAllTodos: (stateTodo: boolean, typeTodo: TypeTodo) => void;
    addTodo: (todo: todosList, typeTodo: TypeTodo) => void;
    deleteTodo: (indexTodo: string) => void;
    changeStatusTodo: (idTodo: string) => void;
    editDataTodo: (idTodo: string, title: string, description: string) => void;
    changeControlTodos: (valueControl: boolean, typeTodo: TypeTodo) => void;
    toggleTodos: (typeTodoOrigin: TypeTodo, typeTodoDestino: TypeTodo) => void;
    getTotalTodosActive: (typeTodo: TypeTodo) => number;
    getTodos: (typeTodo: TypeTodo) => todosList[];
}

export const useTodosStore = create<TodoState>()(
    // Con la instrucción persist se guarda el store en localStore
    devtools(
        persist(
            (set, get) => ({
                listTodos: [],
                inputTodo: '',
                theme_todos: 'light',
                controlThemeTodos: false,
                controlTodosPending: false,
                controlTodosFinished: false,

                // Devolver el tema de la aplicacion
                getThemeTodos: () => {
                    return get().theme_todos;
                },

                // Cambiar el tema de la aplicacion
                changeTheme: (controlTheme: boolean) => {
                    set({ controlThemeTodos: controlTheme })
                    set({ theme_todos: get().controlThemeTodos ? 'dark' : 'light' })
                },

                // Pasar todos los todos de la lista a seleccionados o desseleccionados.
                changeStateAllTodos: (stateTodo: boolean, typeTodo: TypeTodo) => {
                    const tempTodos: todosList[] = get().listTodos.map(itemTodo => {
                        if (itemTodo.typeTodo === typeTodo) {
                            return { ...itemTodo, stateTodo }
                        }
                        return itemTodo;
                    });
                    set(({ listTodos: tempTodos }))
                },

                // Adicionar un todo
                addTodo: (todo: todosList) => {
                    set(state => ({ listTodos: [...state.listTodos, todo] }))
                },

                // Eliminar un todo
                deleteTodo: (indexTodo: string) => {
                    const todosTemp: todosList[] = [...get().listTodos].filter( itemTodo => itemTodo.id != indexTodo);
                    set(({ listTodos: [...todosTemp] }))
                },

                // Cambiar si el todo está seleccionado o no.
                changeStatusTodo: (idTodo: string) => {
                    let ctrlIndexTodo: number = -1;
                    const todoTemp: todosList[] = [...get().listTodos].map( (todo, index) => {
                        if (todo.id === idTodo ) {
                            ctrlIndexTodo = index;
                            return {...todo, stateTodo: !todo.stateTodo}
                        }
                        return todo;
                    });
                    set(({ listTodos: [...todoTemp] }))
                    if ( ctrlIndexTodo > -1) {
                        get().listTodos[ctrlIndexTodo].typeTodo === 'Pending'
                        ? set(({ controlTodosPending: false }))
                        : set(({ controlTodosFinished: false }))
                    }
                },

                // Cambiar si el todo está seleccionado o no.
                editDataTodo: (idTodo: string, title: string, description: string) => {
                    const todoTemp: todosList[] = [...get().listTodos].map( (todo, index) => {
                        if (todo.id === idTodo ) {
                            todo.title = title
                            todo.description = description
                            return {...todo }
                        }
                        return todo;
                    });
                    set(({ listTodos: [...todoTemp] }))
                },

                // Cambiar las variables de control de todos pendientes y finalizados
                changeControlTodos: (valueControl: boolean, typeTodo: TypeTodo) => {
                    (typeTodo === 'Pending')
                        ? set({ controlTodosPending: valueControl })
                        : set({ controlTodosFinished: valueControl })
                },

                // Obtener total de tareas pendinetes o finalizadas.
                getTotalTodosActive: (typeTodo: TypeTodo) => {
                    let totTodosType: number = 0;
                    totTodosType = get().listTodos.reduce((prev, curr) => {
                        if (curr.typeTodo === typeTodo && curr.stateTodo) {
                            prev++;
                        }
                        return prev;
                    }, 0)
                    return totTodosType;
                },

                // Cambiamos los todos de pendientes a terminados y viceversa
                toggleTodos: (typeTodoOrigin: TypeTodo, typeTodoDestino: TypeTodo) => {
                    const todosTypeChecked: todosList[] = get().listTodos.map((todo) =>{
                        if (todo.typeTodo === typeTodoOrigin && todo.stateTodo === true) {
                            return {...todo, stateTodo: false, typeTodo: typeTodoDestino}
                        }
                        return todo;
                    })
                    
                    set({ listTodos: [...todosTypeChecked] });
                    set({ controlTodosPending: false })
                },

                // Traemos lista de todos, ocnforme con el tipo
                getTodos: (typeTodo: TypeTodo) => {
                    const listAllTodos = get().listTodos.filter(todo => todo.typeTodo === typeTodo);
                    return listAllTodos;
                },

            }), { name: 'tasks-javv-1' }
        )
    )
)