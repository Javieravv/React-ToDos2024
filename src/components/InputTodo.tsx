import { useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from "react-toastify";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useInputStorage } from './hooks.ts/useInputStorage'; // custom hook 
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { todosList } from "../interfaces/interfacesTodos";
import { updateTodo } from "../db/fetchData";

export const InputTodo = () => {
    const inputTitleTodo = useRef<HTMLInputElement | null>(null);
    const { user } = useKindeAuth()

    const { todoItem, title, description, changeTitleItem, 
        changeDescriptionItem, initializeItem, isVisibleForm, toggleisVisibleFormToDo } = useInputStorage()

    const handleAddTodo = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()

        const itemTodo: todosList = {
            title: title,
            stateTodo: true,
            typeTodo: 'Pending',
            id: uuidv4(), 
            description: description, 
            userId: user?.id || ''
        }
        // const userActive = localStorage.getItem('user-todo') || '';

        try {
            updateTodo(`${itemTodo.userId}/${itemTodo.id}`, itemTodo)
        } catch (error) {
            throw new Error('Se presentó un error....')
            // return false
        }
        // addTodo(itemTodo, 'Pending') // No es necesaria esta línea con la actualización instantánea.
        toast.success('To-Do Agregado de manera exitosa.')
        initializeItem({title: '', id: '', stateTodo: false, userId: '', routeItem: '', description: '', typeTodo: 'Pending'});
        inputTitleTodo.current?.focus();
    }

    const handleEditTodo = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        const itemEditTodo: todosList = {
            title: title,
            stateTodo: todoItem.stateTodo,
            typeTodo: todoItem.typeTodo,
            id: todoItem.id, 
            description: description, 
            userId: todoItem.userId, 
        }
        // const userActive = localStorage.getItem('user-todo') || '';

        try {
            updateTodo(`${todoItem.userId}/${todoItem.id}`, itemEditTodo)
            .then(() => { 
                toast.success('To-Do modificado manera exitosa.')
             })
        } catch (error) {
            throw new Error('Se presentó un error al modificar el todo....')
            // return false
        }


        // editDataTodo(todoItem.id!, title, description) // No es necesaria.
        initializeItem({title: '', id: '', stateTodo: false, userId: '', routeItem: '', description: '', typeTodo: 'Pending'});
        inputTitleTodo.current?.focus();
    }

    const toggleForm = () => {
        setTimeout(() => {
            toggleisVisibleFormToDo();
        }, 200); // 200 milisegundos de retraso
    };

    return (
        <>
            <section className="formtodo">
                {
                    (isVisibleForm)
                        ? null
                        : (
                            <div className="formtodo_title">
                                <h2>Ingresar Todos</h2>
                                <MdArrowDownward
                                    className="icono-arrow"
                                    onClick={toggleForm}
                                />
                            </div>

                        )
                }
                {
                    (isVisibleForm)
                        ? (
                            <div className={`form_todo ${isVisibleForm ? 'form_visible' : 'form_hidem'}`}>
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
                                            value={title}
                                            ref={inputTitleTodo}
                                            onChange={(e) => changeTitleItem(e.target.value)}
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
                                            value={description}
                                            onChange={(e) => changeDescriptionItem(e.target.value)}
                                        >

                                        </textarea>
                                    </div>

                                    {(!todoItem.stateTodo)
                                        ? (<input
                                            className='formtodo_submit'
                                            type="submit"
                                            value="Agregar To-Do"
                                            disabled={!(title.trim().length > 0)}
                                            onClick={handleAddTodo}
                                        />)
                                        : (<input
                                            className='formtodo_submit'
                                            type="submit"
                                            value="Modificar To-Do"
                                            disabled={!(title.trim().length > 0)}
                                            onClick={handleEditTodo}
                                        />)
                                    }
                                </form>
                                <MdArrowUpward
                                    className="icono-arrow icono-hidemform"
                                    onClick={toggleForm}
                                />
                            </div>
                        )
                        : null
                }
                <ToastContainer
                    position="bottom-right"
                    hideProgressBar
                    closeButton={false}
                    autoClose={500}
                    // style={}}
                    toastStyle={{
                        backgroundColor: "var(--bgColorToastify)",
                        color: "var(--bgTextToastify)"
                    }}
                />
            </section>
        </>
    )
}
