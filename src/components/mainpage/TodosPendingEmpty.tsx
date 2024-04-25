import todosPending from '../../assets/image/todos-pending.svg';

export const TodosPendingEmpty = () => {
    return (
        <section className='todos-information'>
            <h1>Felicidades! <br/>No hay todos pendientes en tu lista!</h1>
            <img src={todosPending} alt="Todos Completed" />
        </section>
    )
}
