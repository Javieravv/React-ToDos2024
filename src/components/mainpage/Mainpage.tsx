import todoImg from '../../assets/image/to_do_list.svg';

export const Mainpage = () => {
   return (
      <section className='mainpage'>
         <div className="mainpage_title">
            <article className='title'>
               <h1>Simple <span>To-Dos</span></h1>
               <p>Simple herramienta para almacenar tareas pendientes</p>
            </article>
            <article className='imagetitle'>
               <img src={todoImg} alt="To dos" />
            </article>
         </div>
         <div className="mainpage_information">
            <div className="information-paragraph">
               {/* <img src={iconoControl} alt="Icono control" /> */}
               <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
                  <polyline fill="none" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="23,34 30,41 
	43,28 "/>
                  <polyline fill="none" strokeWidth="2" strokeMiterlimit="10" points="23,8 10,8 10,63 54,63 54,8 41,8 " />
                  <polygon fill="none" strokeWidth="2" strokeMiterlimit="10" points="36,5 36,1 28,1 28,5 24,5 22,13 42,13 40,5 
	"/>
               </svg>
               <p>Herramienta on line para llevar un simple control de sus tareas diarias.</p>
            </div>
            <div className="information-paragraph">
               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12.3529C22 15.0599 20.0726 17.3221 17.5 17.8722M6.28571 18C3.91878 18 2 16.1038 2 13.7647C2 11.4256 3.91878 9.52941 6.28571 9.52941C6.56983 9.52941 6.8475 9.55673 7.11616 9.60887M14.381 7.02721C14.9767 6.81911 15.6178 6.70588 16.2857 6.70588C16.9404 6.70588 17.5693 6.81468 18.1551 7.01498M7.11616 9.60887C6.88706 8.9978 6.7619 8.33687 6.7619 7.64706C6.7619 4.52827 9.32028 2 12.4762 2C15.4159 2 17.8371 4.19371 18.1551 7.01498M7.11616 9.60887C7.68059 9.71839 8.20528 9.9374 8.66667 10.2426M18.1551 7.01498C18.8381 7.24853 19.4623 7.60648 20 8.06141" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8.5 17C8.5 15.5858 8.5 14.8787 8.93934 14.4393C9.37868 14 10.0858 14 11.5 14H12.5C13.9142 14 14.6213 14 15.0607 14.4393C15.5 14.8787 15.5 15.5858 15.5 17V19C15.5 20.4142 15.5 21.1213 15.0607 21.5607C14.6213 22 13.9142 22 12.5 22H11.5C10.0858 22 9.37868 22 8.93934 21.5607C8.5 21.1213 8.5 20.4142 8.5 19V17Z"  strokeWidth="1.5" />
                  <path d="M11 18H13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>

               <p>No almacena mayor información de sus tareas. Solo su título y una descripción. Con solo dar click en el título se guardará la tarea como completada o pendiente.</p>
            </div>
            <div className="information-paragraph">
               {/* <img src={iconoLogin} alt="Icono login" /> */}
               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16C8 18.8284 8 20.2426 8.87868 21.1213C9.51998 21.7626 10.4466 21.9359 12 21.9827M8 8C8 5.17157 8 3.75736 8.87868 2.87868C9.75736 2 11.1716 2 14 2H15C17.8284 2 19.2426 2 20.1213 2.87868C21 3.75736 21 5.17157 21 8V10V14V16C21 18.8284 21 20.2426 20.1213 21.1213C19.3529 21.8897 18.175 21.9862 16 21.9983" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5M3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 12L15 12M15 12L12.5 14.5M15 12L12.5 9.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
               <p>Para ingresar podrá hacerlo con su cuenta de Google o con un correo electrónico. Si elige correo, se enviará un código a su email para acceder.</p>
            </div>
         </div>
      </section>
   )
}
