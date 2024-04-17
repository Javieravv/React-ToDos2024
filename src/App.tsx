import { useEffect } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { Footer, Header, InputTodo, Listtodo } from './components';
import { useUserStore } from './store/user.store';
import { fetchTodo } from './db/fetchData';
import { useTodosStore } from './store/todos.store';
import { todosList, User } from './interfaces/interfacesTodos';
import { Mainpage } from './components/mainpage';


export const App = () => {
    const { user } = useKindeAuth();
    const { initializeUser } = useUserStore()
    const { setListTodos } = useTodosStore()
    useEffect(() => {
      if (user) {
          localStorage.setItem('user-todo', user.id || 'indefinido')
          localStorage.setItem('todo-user', JSON.stringify(user) || '')
          const dataUser: User = {
             id: user.id || '',
             email: user.email || '',
             given_name: user.given_name || '',
             family_name: user.family_name || '',
             picture: user.picture || undefined
          }
          initializeUser(dataUser.id, dataUser.given_name, dataUser.family_name, dataUser.email, dataUser.picture);
          fetchTodo(dataUser.id).then( (dataTodos: todosList[] ) => {
              setListTodos (dataTodos);
          });
      }
    }, [user, initializeUser, setListTodos])
    
    return (
        <>
            <Header />
            {
                (!user)
                    ? (
                        // TODO: Elaborar componente de bienvenida
                        <>
                            <Mainpage />
                        </>
                    )
                    : (<>
                        {
                            localStorage.setItem('user-todo', user.id || '123')
                        }
                        <InputTodo />
                        <Listtodo />
                    </>)
            }
            <Footer />
        </>
    )
}
