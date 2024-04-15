export type TypeTodo = 'Pending' | 'Completed';

export interface todosList {
    id: string;
    title: string;
    description?: string;
    stateTodo: boolean;
    typeTodo: TypeTodo;
    userId:string;
}

export interface todosProps {
    todos: todosList[]; 
}

export interface todoItem {
    title: string;
    description: string;
    status: boolean;
    id?: string;
}

export interface User {
    id:          string;
    given_name:  string;
    family_name: string;
    email:       string;
    picture?:     string;
}

