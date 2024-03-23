export type TypeTodo = 'Pending' | 'Completed';

export interface todosList {
    todo: string;
    stateTodo: boolean;
    typeTodo: TypeTodo;
}

export interface todosProps {
    todos: todosList[]; 
}
