export type TypeTodo = 'Pending' | 'Completed';

export interface todosList {
    description? : string;
    id           : string;
    route?       : string;
    stateTodo    : boolean;
    title        : string;
    typeTodo     : TypeTodo;
    userId       : string;
}

export interface todosProps {
    todos: todosList[]; 
}

export interface todoItem {
    description  : string;
    id           : string;
    routeItem?   : string;
    stateTodo    : boolean;
    title        : string;
    typeTodo     : TypeTodo;
    userId       : string;
}

export interface User {
    id:          string;
    given_name:  string;
    family_name: string;
    email:       string;
    picture?:     string;
}

