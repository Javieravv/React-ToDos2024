import { useState } from "react"
import { useTodosStore } from "../store/todos.store"

export const InputTodo = () => {
    const [valueToDo, setvalueToDo] = useState('')
    const addTodo = useTodosStore(state => state.addTodo)

    const handleClickTodo = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        addTodo({ todo: valueToDo, stateTodo: false, typeTodo: 'Pending' }, 'Pending')
        setvalueToDo('') 
    }

    return (
        <section className="formtodo">
            <form action="#" className="formtodo_form">
                <label htmlFor="todo" className="formtodo_label">Ingresar ToDo:</label>
                <input
                    className='formtodo_input'
                    type="text"
                    name="todo"
                    id=""
                    placeholder="Ingrese Todo"
                    autoComplete="off"
                    autoFocus={true}
                    value={valueToDo}
                    onChange={(e) => setvalueToDo(e.target.value)}
                />
                <input
                    className='formtodo_submit'
                    type="submit"
                    value="Enviar Todo"
                    disabled={!(valueToDo.trim().length > 0)}
                    onClick={handleClickTodo}
                />
            </form>
        </section>
    )
}
