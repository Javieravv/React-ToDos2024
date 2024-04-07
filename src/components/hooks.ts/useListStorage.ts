import { useItemStore } from "../../store/itemtodo.store";
import { useTodosStore } from "../../store/todos.store";


export const useListStorage = () => {
    const todosPending = useTodosStore(state => state.getTodos('Pending'));
    const todosFinished = useTodosStore(state => state.getTodos('Completed'));
    const controlTodosPending = useTodosStore(state => state.controlTodosPending);
    const controlTodosFinished = useTodosStore(state => state.controlTodosFinished);
    const totalTodosPending = useTodosStore(state => state.getTotalTodosActive('Pending'));
    const totalTodosFinished = useTodosStore(state => state.getTotalTodosActive('Completed'));
    const changeStateAllTodos = useTodosStore(state => state.changeStateAllTodos);
    const changeControlTodos = useTodosStore(state => state.changeControlTodos);
    const toggleTodos = useTodosStore(state => state.toggleTodos);
    const isVisibleListTodo = useTodosStore(state => state.getisVisibleListToDo());
    const toggleisVisibleListToDo = useTodosStore ( state => state.toggleisVisibleListToDo)
    const changeStatusTodo = useTodosStore(state => state.changeStatusTodo);
    const deleteTodo = useTodosStore(state => state.deleteTodo);
    const initializeItem = useItemStore(state => state.initializeItem)
    const listTodos = useTodosStore (state => state.getAllTodos());
    const toggleTodoUnique = useTodosStore (state => state.toggleTodoUnique);

    return {
        todosPending,
        todosFinished,
        controlTodosPending,
        controlTodosFinished,
        totalTodosPending,
        totalTodosFinished,
        changeStateAllTodos,
        changeControlTodos,
        toggleTodos,
        isVisibleListTodo,
        toggleisVisibleListToDo,
        changeStatusTodo,
        deleteTodo,
        initializeItem,
        listTodos,
        toggleTodoUnique
    }
}