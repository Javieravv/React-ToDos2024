export type TypeTodo = 'Pending' | 'Completed';

export interface todosList {
    id: string;
    title: string;
    description?: string;
    stateTodo: boolean;
    typeTodo: TypeTodo;
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
