// Componente para las listas de todos
import { FC, useEffect, useState } from "react";
import { todosList, todosProps, TypeTodo, User } from '../interfaces/interfacesTodos';
import { MdArrowDownward, MdArrowUpward, MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { useListStorage } from "./hooks.ts/useListStorage";
import { fetchTodo, removeTodo, updateTodo } from "../db/fetchData";
import { TodosCompletedEmpthy, Todosempthy, TodosPendingEmpty } from "./mainpage";
import { toast } from "react-toastify";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useUserStore } from "../store/user.store";
import { useTodosStore } from "../store/todos.store";

const MostrarTodo: FC<todosList> = (todo) => {
    const [viewDescription, setViewDescription] = useState(false)
    const { deleteTodo, initializeItem, toggleTodoUnique } = useListStorage()

    const handleEditTodo = (e: React.MouseEvent) => {
        e.preventDefault();
        // initializeItem(todo.title, todo.description ?? '', true, todo.id)
        initializeItem({ description: todo.description || '', title: todo.title, id: todo.id, stateTodo: todo.stateTodo, typeTodo: todo.typeTodo, userId: todo.userId, routeItem: todo.route })
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    }

    // Cambiamos el estado del todo: pending a completed o vs.
    const handleToggleTodoUnique = () => {
        const typeTodoTemp: TypeTodo = todo.typeTodo;
        const todoTemp: todosList = { ...todo };
        todoTemp.typeTodo = (typeTodoTemp === 'Pending') ? 'Completed' : 'Pending';
        updateTodo(`${todo.userId}/${todo.id}`, todoTemp)
            .then(() => {
                toggleTodoUnique(todo.id, typeTodoTemp)
            });
    }

    // Eliminamos el todo
    const handleDeleteTodo = () => {
        removeTodo(`${todo.userId}/${todo.id}`)
            .then(() => {
                deleteTodo(todo.id)
                toast.error('To-Do eliminado de manera exitosa.')
            })
    }

    return (
        <>
            <li
                key={todo.id}
                className={`${(todo.typeTodo === 'Completed') ? 'todo-finished' : 'todo-pending'}`}
            >
                <div className="titletodo">
                    <div className="titletodo-text"
                        onClick={() => handleToggleTodoUnique()}
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
                            onClick={() => handleDeleteTodo()}
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
    const { user } = useKindeAuth();
    const { initializeUser } = useUserStore()
    const { setListTodos } = useTodosStore()
    
    const { totalTodosPending, totalTodosFinished, isVisibleListTodo, toggleisVisibleListToDo, listTodos, todosPending,
        todosFinished } = useListStorage();
    const [listTodoView, setListTodoView] = useState(0)

    useEffect(() => {
        if (user) {
            try {
                fetchTodo(user.id || '').then((dataTodos: todosList[]) => {
                    setListTodos(dataTodos);
                });
            } catch (error) {
                console.log('SE HA PRODUCIDO UN ERROR...', error)
            }
        }
    }, [user, initializeUser, setListTodos])

    const toggleForm = () => {
        // Retrasa la acción de mostrar/ocultar el formulario
        setTimeout(() => {
            toggleisVisibleListToDo();
        }, 200); // 200 milisegundos de retraso
    };

    if (listTodos.length === 0) {
        return (<Todosempthy />)
    }

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
                                {/*Mostrar lista de todos conforme a variable de estado: todos, pendientes, terminados.*/}
                                {
                                    (listTodoView === 0) && <MostrarToDos todos={listTodos} />
                                }
                                {
                                    (listTodoView === 1) && (
                                        todosPending.length === 0 ? <TodosPendingEmpty /> : <MostrarToDos todos={todosPending} />
                                    )
                                }
                                {
                                    (listTodoView === 2) && (
                                        todosFinished.length === 0 ? <TodosCompletedEmpthy /> : <MostrarToDos todos={todosFinished} />
                                    )
                                }

                            </article>
                            <article className="todos-totales">
                                <h4 className="title_total" onClick={() => setListTodoView(0)}>Total de Todos: <span>{totalTodosPending + totalTodosFinished}</span></h4>
                                <p className="title_pending" onClick={() => setListTodoView(1)}>Pendientes: <span>{totalTodosPending}</span> </p>
                                <p className="title_finished" onClick={() => setListTodoView(2)}>Terminados: <span>{totalTodosFinished}</span></p>
                            </article>
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
