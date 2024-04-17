// Estado para el usuario que se registra en la app.
// import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';
import { User } from '../interfaces/interfacesTodos';
import { create } from 'zustand';

interface UserItem {
    userData: User;
    initializeUser: (id: string, given_name: string, family_name:string, email:string, picture: string | undefined) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserItem>()(
    // Con la instrucción persist se guarda el store en localStore
    devtools(
        persist(
            (set) => ({
                userData: { 
                    id:          '',
                    given_name:  '',
                    family_name: '',
                    email:       '',
                    picture:     ''
                 },

                 initializeUser: (id: string, given_name: string, family_name:string, email:string, picture: string | undefined) => {
                    set ({ userData: {id: id, given_name: given_name, family_name: family_name, email: email, picture: picture ? picture : undefined} })
                 },

                 resetUser: () => {
                    set ({ userData: {id: '', given_name: '', family_name: '', email: '', picture: undefined} })
                 },

            }), { name: 'todo-user' }
        )
    )
)

