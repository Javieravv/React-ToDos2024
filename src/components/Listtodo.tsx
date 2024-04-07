// Componente para las listas de todos
import { FC, useState } from "react";
import { todosList, todosProps } from "../interfaces/interfacesTodos";
import { MdArrowDownward, MdArrowUpward, MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { useListStorage } from "./hooks.ts/useListStorage";

const MostrarTodo: FC<todosList> = (todo) => {
    const [viewDescription, setViewDescription] = useState(false)
    const { changeStatusTodo, deleteTodo, initializeItem, toggleTodoUnique } = useListStorage()

    const handleEditTodo = (e: React.MouseEvent) => {
        e.preventDefault();
        initializeItem(todo.title, todo.description ?? '', true, todo.id)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    }

    return (
        <>
            <li 
                key={todo.id}
                className={ `${(todo.typeTodo === 'Completed') ? 'todo-finished' : 'todo-pending'}`  }
            >
                <div className="titletodo">
                    {/* <label
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
                    </label> */}
                    <div
                        onClick={() => toggleTodoUnique(todo.id, todo.typeTodo)}
                    >
                        {todo.title}
                    </div>

                    <div className="iconos_todo">
                        <div className="icono_edit">
                            <MdModeEditOutline
                                onClick={handleEditTodo}
                            />
                        </div>
                        <div className="icono_viewdescription">
                            {
                                (!viewDescription)
                                    ? (<IoIosArrowForward className="svgIconoDescription" onClick={() => setViewDescription(!viewDescription)} />)
                                    : (<IoIosArrowUp className="svgIconoDescription" onClick={() => setViewDescription(!viewDescription)} />)
                            }
                        </div>
                        <div
                            className="iconodelete"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            <MdDelete className="svgIconDelete" />
                        </div>

                    </div>

                </div>
                {
                    (viewDescription) && (
                        <div className="descriptiontodo">
                            <p className="description-todo">{todo.description}</p>
                        </div>
                    )
                }
                <div className="text-typetodo">
                    <span>{todo.typeTodo}</span>
                </div>
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
    const { todosPending, todosFinished, controlTodosPending, controlTodosFinished, totalTodosPending, totalTodosFinished,
        changeStateAllTodos, changeControlTodos, toggleTodos, isVisibleListTodo, toggleisVisibleListToDo, listTodos } = useListStorage();

    const toggleForm = () => {
        // Retrasa la acción de mostrar/ocultar el formulario
        setTimeout(() => {
            toggleisVisibleListToDo();
        }, 200); // 200 milisegundos de retraso
    };

    return (
        <section>
            {
                (isVisibleListTodo
                    ? null
                    : (
                        <div className="listtodos_title">
                            <h2>Listado de To-Dos</h2>
                            <MdArrowDownward
                                className="icono-arrow"
                                onClick={toggleForm}
                            />
                        </div>
                    ))
            }
            {
                (isVisibleListTodo
                    ? (
                        <div className="listtodos">
                            <article className="list-alltodos">
                                <MostrarToDos todos={listTodos} />
                            </article>
                            <article className="todos-totales">
                                <h4 onClick={() => alert('Todos')}>Total de Todos: <span>{totalTodosPending + totalTodosFinished}</span></h4>
                                <p onClick={() => alert('Pendientes')}>Pendientes: <span>{totalTodosPending}</span> </p>
                                <p onClick={() => alert('Terminados')}>Terminados: <span>{ totalTodosFinished}</span></p>
                            </article>
                            {/* <article className="listtodos_activos">
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
                                    >Pasar a Terminados
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
                            </article> */}
                            <MdArrowUpward
                                className="icono-arrow icono-hidemform"
                                onClick={toggleForm}
                            />
                        </div>
                    )
                    : null
                )
            }
        </section>
    )
}
