import { useEffect } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { Footer, Header, InputTodo, Listtodo } from './components';


export const App = () => {

    const { user } = useKindeAuth()
    useEffect(() => {
        console.log('EL USUARIO HA CAMBIADO....', user)
        if (user) {
            localStorage.setItem('user-todo', user.id || '')
        } else { localStorage.setItem('user-todo', '') }
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
                        <InputTodo />
                        <Listtodo />
                    </>)
            }
            <Footer />
        </>
    )
}
