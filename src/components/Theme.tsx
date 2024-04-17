// Componente para cambiar el tema 
import { useEffect, useState } from "react";
import { useTodosStore } from "../store/todos.store"

export const Theme = () => {
    const controlThemeTodos = useTodosStore(state => state.controlThemeTodos);
    const changeTheme = useTodosStore(state => state.changeTheme);
    const [ctrlThemeTodo, setCtrlThemeTodo] = useState(controlThemeTodos);
    const themeTodos = useTodosStore(state => state.getThemeTodos);

    useEffect(() => {
        handleTheme()
    }, [])

    const handleChangeTheme = () => {
        setCtrlThemeTodo(!ctrlThemeTodo)
        changeTheme(!ctrlThemeTodo)
        handleTheme();
    }

    const handleTheme = () => {
        const root = document.documentElement;
        root.setAttribute('data-theme', themeTodos());
    }
    return (
        <section className="theme">
            <div className="theme_switcher">
                <input
                    type="checkbox"
                    name="theme"
                    id="theme_darklight"
                    checked={ctrlThemeTodo}
                    onChange={handleChangeTheme}
                />
                <div className="theme_option">
                </div>
            </div>
        </section>
    )
}
