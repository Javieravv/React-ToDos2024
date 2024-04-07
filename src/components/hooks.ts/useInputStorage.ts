/**Devolvemos lo que se necesita del storage, para evitar escribir 
 * muchas líneas.
 */

import { useItemStore } from "../../store/itemtodo.store";
import { useTodosStore } from "../../store/todos.store";

export function useInputStorage() {
    const todoItem = useItemStore(state => state.getTodo())
    const title = useItemStore(state => state.getTodoTitle());
    const description = useItemStore(state => state.getTodoDescription());
    const changeTitleItem = useItemStore(state => state.changeTitleItem);
    const changeDescriptionItem = useItemStore(state => state.changeDescriptionItem)
    const initializeItem = useItemStore(state => state.initializeItem)
    const addTodo = useTodosStore(state => state.addTodo)
    const editDataTodo = useTodosStore(state => state.editDataTodo)
    const isVisibleForm = useTodosStore(state => state.getisVisibleFormToDo())
    const toggleisVisibleFormToDo = useTodosStore(state => state.toggleisVisibleFormToDo)

    return {
        todoItem,
        title,
        description,
        changeTitleItem,
        changeDescriptionItem,
        initializeItem,
        addTodo,
        editDataTodo,
        isVisibleForm,
        toggleisVisibleFormToDo
    }
}