import todosEmpty from '../../assets/image/nodata-todos.svg';

export const Todosempthy = () => {
  return (
    <section className='todos-information'>
        <h1>Ups!!! No hay To-Dos en tu lista!</h1>
        <img src={todosEmpty} alt="Todos empty" />
    </section>
  )
}
