import { useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from "react-toastify";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useInputStorage } from './hooks.ts/useInputStorage'; // custom hook 

export const InputTodo = () => {
    const inputTitleTodo = useRef<HTMLInputElement | null>(null);

    const { todoItem, title, description, changeTitleItem, 
        changeDescriptionItem, initializeItem, 
        addTodo, editDataTodo, isVisibleForm, toggleisVisibleFormToDo } = useInputStorage()

    const handleClickTodo = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        addTodo({title: title,stateTodo: false,typeTodo: 'Pending',id: uuidv4(),description: description}, 'Pending')
        toast.success('To-Do Agregado de manera exitosa.')
        initializeItem('', '', false, '');
        inputTitleTodo.current?.focus();
    }

    const handleEditTodo = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        editDataTodo(todoItem.id!, title, description)
        toast.success('To-Do modificado  de manera exitosa.')
        initializeItem('', '', false, '');
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

                                    {(!todoItem.status)
                                        ? (<input
                                            className='formtodo_submit'
                                            type="submit"
                                            value="Agregar To-Do"
                                            disabled={!(title.trim().length > 0)}
                                            onClick={handleClickTodo}
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
