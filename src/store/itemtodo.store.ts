// Store para lostodos 
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';
import { todoItem } from '../interfaces/interfacesTodos';

interface TodoItem {
    itemTodo: todoItem;
    // initializeItem: ( title: string, description: string, status: boolean, id?:string ) => void;
    initializeItem: (item: todoItem) => void;
    changeTitleItem: (value: string) => void;
    changeDescriptionItem: (value: string) => void;
    changeStatusItem: (value: boolean) => void;
    getTodoTitle: () => string;
    getTodoDescription: () => string;
    getTodo: () => todoItem;
}

export const useItemStore = create<TodoItem>()(
    // Con la instrucción persist se guarda el store en localStore
    devtools(
        persist(
            (set, get) => ({
                itemTodo: {
                    title: '',
                    description: '',
                    stateTodo: false,
                    id: '',
                    typeTodo: 'Pending',
                    userId: '',
                    routeItem: ''
                },

                // initializeItem: (title: string, description: string, status: boolean, id?: string) => {
                initializeItem: (item: todoItem) => {
                    set ({ itemTodo: item })
                },

                changeTitleItem: (value: string) => {
                    const todoTemp = get().itemTodo;
                    todoTemp.title = value;
                    set({ itemTodo: todoTemp })
                },

                changeDescriptionItem: (value: string) => {
                    const todoTemp = get().itemTodo;
                    todoTemp.description = value;
                    set({ itemTodo: todoTemp })
                },

                changeStatusItem: (value: boolean) => {
                    const todoTemp = get().itemTodo;
                    todoTemp.stateTodo = value;
                    set({ itemTodo: todoTemp })
                },

                getTodoTitle:       () => { return get().itemTodo.title },
                getTodoDescription: () => { return get().itemTodo.description },
                getTodo: () => { return get().itemTodo }

            }), { name: 'todo-item' }
        )
    )
)