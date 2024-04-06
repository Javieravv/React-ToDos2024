import { useRef, useState } from "react"
import { useTodosStore } from "../store/todos.store"
import { v4 as uuidv4 } from 'uuid';

export const InputTodo = () => {
    const inputTitleTodo = useRef<HTMLInputElement | null>(null);
    const [valueToDo, setvalueToDo] = useState('')
    const [descriptionToDo, setdescriptionToDo] = useState('')
    const addTodo = useTodosStore(state => state.addTodo)

    const handleClickTodo = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        addTodo({
            title: valueToDo,
            stateTodo: false,
            typeTodo: 'Pending',
            id: uuidv4(),
            description: descriptionToDo
        }, 'Pending')
        setvalueToDo('')
        setdescriptionToDo('');
        inputTitleTodo.current?.focus();
    }

    return (
        <section className="formtodo">
            <form action="#" className="formtodo_form">
                <div className="formtodo_inputs">
                    <label htmlFor="todo" className="formtodo_label">Ingresar To-Do:</label>
                    <input
                        className='formtodo_input'
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="Ingrese To-do"
                        autoComplete="off"
                        autoFocus={true}
                        value={valueToDo}
                        ref={inputTitleTodo}
                        onChange={(e) => setvalueToDo(e.target.value)}
                    />
                    <label htmlFor="description" className="formtodo_label">Descripción:</label>
                    <textarea
                        className='formtodo_textarea'
                        name="description"
                        id="description"
                        placeholder="Descripción del ToDo"
                        autoComplete="off"
                        autoFocus={false}
                        rows={3}
                        value={descriptionToDo}
                        onChange={(e) => setdescriptionToDo(e.target.value)}
                    >

                    </textarea>
                </div>

                <input
                    className='formtodo_submit'
                    type="submit"
                    value="Agregar To-Do"
                    disabled={!(valueToDo.trim().length > 0)}
                    onClick={handleClickTodo}
                />
            </form>
        </section>
    )
}
