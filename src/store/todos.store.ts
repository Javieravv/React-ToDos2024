// Store para lostodos 
import { create } from 'zustand'
import { TypeTodo, todosList } from '../interfaces/interfacesTodos';
import { createJSONStorage, devtools, persist, StateStorage } from 'zustand/middleware';
import { fetchTodo, updateTodo, writeTodo } from '../db/fetchData';

interface TodoState {
    listTodos: todosList[];
    inputTodo: string;
    theme_todos: string;
    controlThemeTodos: boolean;
    controlTodosPending: boolean;
    controlTodosFinished: boolean;
    isVisibleFormToDo: boolean;
    isVisibleListToDo: boolean;

    getThemeTodos: () => string;
    changeTheme: (controlTheme: boolean) => void;
    changeStateAllTodos: (stateTodo: boolean, typeTodo: TypeTodo) => void;
    addTodo: (todo: todosList, typeTodo: TypeTodo) => void;
    deleteTodo: (indexTodo: string) => void;
    changeStatusTodo: (idTodo: string) => void;
    editDataTodo: (idTodo: string, title: string, description: string) => void;
    changeControlTodos: (valueControl: boolean, typeTodo: TypeTodo) => void;
    toggleTodos: (typeTodoOrigin: TypeTodo, typeTodoDestino: TypeTodo) => void;
    toggleTodoUnique: (idTodo: string, typeTodo: TypeTodo) => void;
    getTotalTodosActive: (typeTodo: TypeTodo) => number;
    getTodos: (typeTodo: TypeTodo) => todosList[];
    getAllTodos: () => todosList[];
    toggleisVisibleFormToDo: () => void;
    toggleisVisibleListToDo: () => void;
    getisVisibleFormToDo: () => boolean;
    getisVisibleListToDo: () => boolean;
}

/* Para recuperar la información del storage persistente conforme con el id del usuario
que se autentica.**/
const hashStorage: StateStorage = {
    getItem: () => {
        // recuperamos el usuario activo y con él recuperamos los todos que hay en la base de datos.
        const userActive = localStorage.getItem('user-todo') || '';
        let tempStorage;
        fetchTodo(userActive).then((todoData) => {
            console.log('LA DATA QUE LLEGÓ ES ', todoData)
            tempStorage = JSON.parse(localStorage.getItem('tasks-javv-1') || '');
            console.log('LOCAL STORAGE RECUPERADO ES ', tempStorage);
            tempStorage.state.listTodos = todoData
        });
        console.log('LOS DATOS DEL STORAGE SON ', tempStorage)
        return JSON.stringify(tempStorage);
        // let dataTodos = null;
        // tempStorage.state.listTodos = dataTodos;
        // console.log('RESULTADOS FINALES...', arrayTemp)
        // tempStorage.state.listTodos = arrayTemp;
    },
    setItem: (key, newValue) => {
        // console.log('PASAMOS POR SET ITEM key...', key, newValue)
        localStorage.setItem(key, newValue)
    },
    removeItem: () => {
        // console.log('PASAMOS POR REMOVE  ITEM...')
    }
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
                isVisibleFormToDo: true,
                isVisibleListToDo: true,
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
                    const todosTemp: todosList[] = [...get().listTodos].filter(itemTodo => itemTodo.id != indexTodo);
                    set(({ listTodos: [...todosTemp] }))
                },

                // Cambiar si el todo está seleccionado o no.
                changeStatusTodo: (idTodo: string) => {
                    let ctrlIndexTodo: number = -1;
                    const todoTemp: todosList[] = [...get().listTodos].map((todo, index) => {
                        if (todo.id === idTodo) {
                            ctrlIndexTodo = index;
                            return { ...todo, stateTodo: !todo.stateTodo }
                        }
                        return todo;
                    });
                    set(({ listTodos: [...todoTemp] }))
                    if (ctrlIndexTodo > -1) {
                        get().listTodos[ctrlIndexTodo].typeTodo === 'Pending'
                            ? set(({ controlTodosPending: false }))
                            : set(({ controlTodosFinished: false }))
                    }
                },

                // Cambiar si el todo está seleccionado o no.
                editDataTodo: (idTodo: string, title: string, description: string) => {
                    const todoTemp: todosList[] = [...get().listTodos].map((todo) => {
                        if (todo.id === idTodo) {
                            todo.title = title
                            todo.description = description
                            return { ...todo }
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
                        if (curr.typeTodo === typeTodo) {
                            prev++;
                        }
                        return prev;
                    }, 0)
                    return totTodosType;
                },

                // Cambiamos los todos de pendientes a terminados y viceversa
                toggleTodos: (typeTodoOrigin: TypeTodo, typeTodoDestino: TypeTodo) => {
                    const todosTypeChecked: todosList[] = get().listTodos.map((todo) => {
                        if (todo.typeTodo === typeTodoOrigin && todo.stateTodo === true) {
                            return { ...todo, stateTodo: false, typeTodo: typeTodoDestino }
                        }
                        return todo;
                    })

                    set({ listTodos: [...todosTypeChecked] });
                    set({ controlTodosPending: false })
                },

                // Cambiamos el todo de Pendint a Completed y viceversa.
                toggleTodoUnique: (idTodo: string, typeTodo: TypeTodo) => {
                    const newTypeTodo: TypeTodo = (typeTodo === 'Completed' ? 'Pending' : 'Completed')
                    const todosTemp: todosList[] = get().listTodos.map((todo) => {
                        if (todo.id === idTodo) {
                            return { ...todo, typeTodo: newTypeTodo }
                        }
                        return todo;
                    })

                    set({ listTodos: [...todosTemp] });
                },

                // Traemos lista de todos, ocnforme con el tipo
                getTodos: (typeTodo: TypeTodo) => {
                    const listAllTodos = get().listTodos.filter(todo => todo.typeTodo === typeTodo);
                    return listAllTodos;
                },

                // Traemos todos los todos.
                getAllTodos: () => {
                    return get().listTodos;
                },

                toggleisVisibleFormToDo: () => { set({ isVisibleFormToDo: !get().isVisibleFormToDo }) },
                toggleisVisibleListToDo: () => { set({ isVisibleListToDo: !get().isVisibleListToDo }) },
                getisVisibleFormToDo: () => { return get().isVisibleFormToDo },
                getisVisibleListToDo: () => { return get().isVisibleListToDo },

            }),
            {
                name: 'tasks-javv-1',
                storage: createJSONStorage(() => hashStorage),
            }
        )
    )
)