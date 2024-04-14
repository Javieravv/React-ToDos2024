import { useKindeAuth, } from "@kinde-oss/kinde-auth-react";
import { Theme } from "./Theme"
import avatarImg from '../assets/AvatarJavv.webp';


export const Header = () => {
    const { login, isAuthenticated, user, logout } = useKindeAuth();

    const todoLogin = () => {
        login()
        console.log('ENTRANDO....')
    }

    const todoLogout = () => {
        logout();
        localStorage.setItem('user-todo', '');
    }

    return (
        <header className="header">
            <nav>
                <h2 className="header_title">Todos 2024 </h2>
                <div className="menu">
                    <span className="username">{
                        (user) && `${user?.given_name} ${user?.family_name}`
                    }</span>
                    <div className="imgavatar">
                        {
                            (isAuthenticated)
                                ? ((!user?.picture)
                                    ? <img src={avatarImg} alt="Avatar" />
                                    : <img src={user?.picture} alt="Avatar" />)
                                : null
                        }
                    </div>
                    {
                        (isAuthenticated)
                            ? (
                                <button className="btn-authenticate" onClick={() => todoLogout()} >Logout</button>
                            )
                            : (
                                <button className="btn-authenticate" onClick={() => todoLogin()} >Log In</button>
                            )
                    }
                    <Theme />
                </div>
            </nav>
        </header>
    )
}
