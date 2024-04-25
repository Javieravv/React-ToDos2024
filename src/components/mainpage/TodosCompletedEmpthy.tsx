import todosCompleted from '../../assets/image/todolist-completed.svg'

export const TodosCompletedEmpthy = () => {
    return (
        <section className='todos-information'>
            <h1>No tienes todos completados en tu lista!</h1>
            <img src={todosCompleted} alt="Todos Completed" />
        </section>
    )
}
