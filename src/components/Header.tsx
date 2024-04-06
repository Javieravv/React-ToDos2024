import { Theme } from "./Theme"
import avatarImg from '../assets/AvatarJavv.webp';


export const Header = () => {
    return (
        <header className="header">
            <nav>
                <h2 className="header_title">Todos 2024 </h2>
                <div className="menu">
                    <span className="username">Xavier Vargas</span>
                    <div className="imgavatar">
                        <img src={avatarImg} alt="Avatar" />
                    </div>
                    <Theme />
                </div>
            </nav>
        </header>
    )
}
