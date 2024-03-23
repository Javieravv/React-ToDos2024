// Componente para las listas de todos
import { FC } from "react";
import { todosProps } from "../interfaces/interfacesTodos";
import { useTodosStore } from '../store/todos.store';

const MostrarToDos: FC<todosProps> = ({ todos }) => {
    const changeStatusTodo = useTodosStore(state => state.changeStatusTodo);
    const deleteTodo = useTodosStore(state => state.deleteTodo);

    console.log('RENDERIZAMOS TODOSSSS');

    return (
        <>
            <ul>
                {
                    todos.map((todo, index) => {
                        return (
                            <li key={todo.todo}>
                                <label
                                    htmlFor={`todopendiente-${todo.todo}`}
                                >
                                    <input
                                        type="checkbox"
                                        name={`todopendiente-${todo.todo}`}
                                        id={`todopendiente-${todo.todo}`}
                                        checked={todo.stateTodo}
                                        onChange={() => {
                                            changeStatusTodo(index, todo.typeTodo)
                                        }}
                                    />
                                    {todo.todo}
                                </label>
                                <div 
                                    className="iconodelete"
                                    onClick={() => deleteTodo(index, todo.typeTodo)}
                                    >
                                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z" /></svg>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}


export const Listtodo = () => {
    const todosPending = useTodosStore(state => state.todosPending);
    const todosFinished = useTodosStore(state => state.todosFinished);
    const controlTodosPending = useTodosStore(state => state.controlTodosPending);
    const controlTodosFinished = useTodosStore(state => state.controlTodosFinished);
    const totalTodosPending = useTodosStore(state => state.getTotalTodosActive('Pending'));
    const totalTodosFinished = useTodosStore(state => state.getTotalTodosActive('Completed'));
    const changeStateAllTodos = useTodosStore(state => state.changeStateAllTodos);
    const changeControlTodos = useTodosStore(state => state.changeControlTodos);
    const toggleTodos = useTodosStore (state => state.toggleTodos);

    return (
        <section className="listtodos">
            <article className="listtodos_activos">
                <h3>Todos Pendientes</h3>
                <div className="listtodos_menu">
                    <label className="todopendientesall" htmlFor="todopendientesall">
                        <input
                            type="checkbox"
                            name="todopendientesall"
                            id="todopendientesall"
                            checked={controlTodosPending}
                            onChange={() => {
                                changeControlTodos(!controlTodosPending, 'Pending');
                                changeStateAllTodos(todosPending, !controlTodosPending, 'Pending');
                            }}
                        />
                        Marcar todos
                    </label>
                    <button
                        className='listtodos_btn'
                        disabled={!(totalTodosPending > 0)}
                        onClick={() => toggleTodos('Pending')}
                    >Pasar a Terminadas</button>
                </div>
                <MostrarToDos todos={todosPending} />
            </article>
            <article className="listtodos_terminados">
                <h3>Todos Terminados</h3>
                <div className="listtodos_menu">
                    <label className="todoterminadosall" htmlFor="todoterminadosall">
                        <input
                            type="checkbox"
                            name="todoterminadosall"
                            id="todoterminadosall"
                            checked={controlTodosFinished}
                            onChange={() => {
                                changeControlTodos(!controlTodosFinished, 'Completed')
                                changeStateAllTodos(todosFinished, !controlTodosFinished, 'Completed');
                            }}
                        />
                        Marcar todos
                    </label>
                    <button
                        className='listtodos_btn'
                        disabled={!(totalTodosFinished > 0)}
                        onClick={() => toggleTodos('Completed')}
                    >
                        Pasar a Pendientes
                    </button>
                </div>
                <MostrarToDos todos={todosFinished} />
            </article>
        </section>
    )
}
