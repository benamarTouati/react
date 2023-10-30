import './App.css';
import { useState } from "react";
import { initialTodos } from './data';

function App() {
    const [todos, setTodos] = useState(initialTodos);
    const [add, setAdd] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    const addTodo = () => {
        const newTodo = {
            title: add,
            id: Date.now().toString()
        }
        setTodos([...todos, newTodo]);
        setAdd('');
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const openModal = (todo) => {
        setCurrentTodo(todo);
        setEditedTitle(todo.title);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setCurrentTodo(null);
        setEditedTitle('');
    }

    const saveTodoChanges = () => {
        setTodos(todos.map(todo =>
            todo.id === currentTodo.id ? { ...todo, title: editedTitle } : todo
        ));
        closeModal();
    };

    return (
        <>
            <h1>TO DO Liste</h1>
            <div style={{ textAlign: "center" }}>
                <label>
                    Ajouté une ligne à la liste :
                    <input
                        value={add}
                        onChange={e => setAdd(e.target.value)}
                    />
                    <button onClick={addTodo}>Ajouter</button>
                </label>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                        <div>
                            <button onClick={() => openModal(todo)}>Modifier</button>
                            <button onClick={() => removeTodo(todo.id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Modifier la tâche</h2>
                        <input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <div>
                            <button onClick={saveTodoChanges}>Sauvegarder</button>
                            <button onClick={closeModal}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default App;
