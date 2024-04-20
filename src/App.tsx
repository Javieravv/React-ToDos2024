import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { Footer, Header, InputTodo, Listtodo } from './components';
import { Mainpage } from './components/mainpage';


export const App = () => {
    const { user } = useKindeAuth();
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
