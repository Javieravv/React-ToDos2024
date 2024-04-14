import { useEffect } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { Footer, Header, InputTodo, Listtodo } from './components';


export const App = () => {
    const { user } = useKindeAuth();
    useEffect(() => {
      console.log('EL USUARIO HA CAMBIADO.....')
      if (user) {
        console.log('SE CAMBIÓ EL ID DEL USUARIO ')
          localStorage.setItem('user-todo', user.id || 'indefinido')
      }
    }, [user])
    
    return (
        <>
            <Header />
            {
                (!user)
                    ? (
                        // TODO: Elaborar componente de bienvenida
                        <>
                            <h1>No hay usuario Registrado....</h1>
                        </>
                    )
                    : (<>
                        {
                            // console.log('RECUPERAMOS DATOS DEL USUARIO...', user.id)
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
