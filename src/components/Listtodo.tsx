// Componente para las listas de todos
import { FC, useState } from "react";
import { todosList, todosProps } from "../interfaces/interfacesTodos";
import { useTodosStore } from '../store/todos.store';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowUp  } from "react-icons/io";
import { useItemStore } from "../store/itemtodo.store";

const MostrarTodo: FC<todosList> = (todo) => {
    const changeStatusTodo = useTodosStore(state => state.changeStatusTodo);
    const deleteTodo = useTodosStore(state => state.deleteTodo);
    const [viewDescription, setViewDescription] = useState(false)
    const initializeItem = useItemStore( state => state.initializeItem)

    const handleEditTodo = (e: React.MouseEvent) => {
        e.preventDefault();
        initializeItem (todo.title, todo.description ?? '', true, todo.id)
        window.scrollTo ({ top: 0, behavior: 'smooth' });
        return false;
    }

    return (
        <>
            <li key={todo.id}>
                <div className="titletodo">
                    <label
                        htmlFor={`todopendiente-${todo.id}`}
                    >
                        <input
                            type="checkbox"
                            name={`todopendiente-${todo.title}`}
                            id={`todopendiente-${todo.id}`}
                            checked={todo.stateTodo}
                            onChange={() => {
                                changeStatusTodo(todo.id)
                            }}
                        />
                        {todo.title}
                    </label>

                    <div className="iconos_todo">
                        <div className="icono_edit">
                            <MdModeEditOutline 
                                onClick = { handleEditTodo }
                            />
                        </div>
                        <div className="icono_viewdescription">
                            {
                                (!viewDescription)
                                    ? (<IoIosArrowForward className="svgIconoDescription" onClick={() => setViewDescription(!viewDescription)}/> )
                                    : (<IoIosArrowUp className="svgIconoDescription" onClick={() => setViewDescription(!viewDescription)} />)
                            }
                        </div>
                        <div
                            className="iconodelete"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            {/* <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z" /></svg> */}
                            <MdDelete className="svgIconDelete" />
                        </div>

                    </div>

                </div>
                {
                    (viewDescription) && (
                        <div className="descriptiontodo">
                            <p>{todo.description}</p>
                        </div>
                    )
                }
            </li>
        </>
    )
}

// Mostramos todos los Todos. Para cada Todo lo mostraremos en un componente individual
const MostrarToDos: FC<todosProps> = ({ todos }) => {
    return (

        <>
            <ul>
                {
                    todos.map((todo) => {
                        return (
                            <MostrarTodo key={todo.id}  {...todo} />
                        )
                    })
                }
            </ul>
        </>
    )
}


export const Listtodo = () => {
    const todosPending = useTodosStore(state => state.getTodos('Pending'));
    const todosFinished = useTodosStore(state => state.getTodos('Completed'));
    const controlTodosPending = useTodosStore(state => state.controlTodosPending);
    const controlTodosFinished = useTodosStore(state => state.controlTodosFinished);
    const totalTodosPending = useTodosStore(state => state.getTotalTodosActive('Pending'));
    const totalTodosFinished = useTodosStore(state => state.getTotalTodosActive('Completed'));
    const changeStateAllTodos = useTodosStore(state => state.changeStateAllTodos);
    const changeControlTodos = useTodosStore(state => state.changeControlTodos);
    const toggleTodos = useTodosStore(state => state.toggleTodos);

    return (
        <section className="listtodos">
            <article className="listtodos_activos">
                <h3>To-Dos Pendientes  <span>{todosPending.length}</span></h3>
                <div className="listtodos_menu">
                    <label className="todopendientesall" htmlFor="todopendientesall">
                        <input
                            type="checkbox"
                            name="todopendientesall"
                            id="todopendientesall"
                            checked={controlTodosPending}
                            onChange={() => {
                                changeControlTodos(!controlTodosPending, 'Pending');
                                changeStateAllTodos(!controlTodosPending, 'Pending');
                            }}
                        />
                        Marcar todos
                    </label>
                    <button
                        className='listtodos_btn'
                        disabled={!(totalTodosPending > 0)}
                        onClick={() => toggleTodos('Pending', 'Completed')}
                    >Pasar a Terminadas
                    </button>
                </div>
                <MostrarToDos todos={todosPending} />
            </article>
            <article className="listtodos_terminados">
                <h3>To-Dos Terminados <span>{todosFinished.length}</span> </h3>
                <div className="listtodos_menu">
                    <label className="todoterminadosall" htmlFor="todoterminadosall">
                        <input
                            type="checkbox"
                            name="todoterminadosall"
                            id="todoterminadosall"
                            checked={controlTodosFinished}
                            onChange={() => {
                                changeControlTodos(!controlTodosFinished, 'Completed')
                                changeStateAllTodos(!controlTodosFinished, 'Completed');
                            }}
                        />
                        Marcar todos
                    </label>
                    <button
                        className='listtodos_btn'
                        disabled={!(totalTodosFinished > 0)}
                        onClick={() => toggleTodos('Completed', 'Pending')}
                    >
                        Pasar a Pendientes
                    </button>
                </div>
                <MostrarToDos todos={todosFinished} />
            </article>
        </section>
    )
}
