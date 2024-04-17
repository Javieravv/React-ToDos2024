import { getDatabase, ref, onValue, set, update, push, get, child, remove } from "firebase/database";
import app from "./firebaseConfig";
import { todosList } from "../interfaces/interfacesTodos";

export const fetchTodo = async (user: string = ''):Promise<todosList[] | []> => {
    const db = getDatabase(); // Assuming you have 'getDatabase' defined
    const userRef = ref(db, user); // Reference to the user node
    try {
        const snapshot = await get(userRef); // Use 'await' for async function
        if (snapshot.exists()) {
            const dataValue: todosList[] = Object.values(snapshot.val()); // Access data after retrieval
            // const dataValue: todosList[] = snapshot.val(); // Access data after retrieval
            return dataValue; // Return the data
        } else {
            console.log("No data available for user:", user);
            return []; // Return empty array if no data
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return empty array on error
    }
}

export const writeTodo = async (user: string, itemTodo: todosList) => {
    const db = getDatabase(app)
    set(ref(db, user), itemTodo)
}

export const updateTodo = async (routeTodo: string, itemTodo: todosList) => {
    // routeTodo es la ruta donde se guardará el todo. Si el usuario no tiene ruta inicial la creará
    const db = getDatabase(app)
    set(ref(db, routeTodo), itemTodo)
}

export const removeTodo = async (routeTodo: string) => {
    const db = getDatabase(app)
    remove(ref(db, routeTodo))
}

