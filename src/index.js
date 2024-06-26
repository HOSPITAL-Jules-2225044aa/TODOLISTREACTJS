import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Task from './components/Task';
import Categories from './components/Categories';
import ReactDOM from 'react-dom';

const CATEGORIES = [
    {
        id: '1',
        icon: 'home',
    },
    {
        id: '2',
        icon: 'work',
    },
    {
        id: '3',
        icon: 'shopping_cart',
    },
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState(CATEGORIES[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
        if (tasksFromLocalStorage) {
            setTasks(tasksFromLocalStorage);
            setFilteredTasks(tasksFromLocalStorage);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    useEffect(() => {
        const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [searchQuery, tasks]);
    
    const handleAddTask = () => {
        const newTask = {
            id: Date.now().toString(),
            title: newTaskTitle,
            category: newTaskCategory,
            isChecked: false,
        };
        setTasks([...tasks, newTask]);
        setFilteredTasks([...filteredTasks, newTask]);
        setIsModalOpen(false);
        setNewTaskTitle('');
    };
    
    const handleSaveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Les tâches ont été sauvegardées avec succès !');
    };
    
    useEffect(() => {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
        if (tasksFromLocalStorage && tasksFromLocalStorage.length > 0) {
            const shouldLoadTasks = window.confirm('Des tâches existent déjà. Voulez-vous les charger ?');
            if (shouldLoadTasks) {
                setTasks(tasksFromLocalStorage);
                setFilteredTasks(tasksFromLocalStorage);
            }
        }
    }, []);
    
    const handleCheckTask = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isChecked: !task.isChecked };
            }
            return task;
        });
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };
    
    const handleMoveTaskUp = (taskId) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex === 0) {
            return;
        }
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(taskIndex, 1);
        updatedTasks.splice(taskIndex - 1, 0, movedTask);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };
    
    const handleMoveTaskDown = (taskId) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex === tasks.length - 1) {
            return;
        }
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(taskIndex, 1);
        updatedTasks.splice(taskIndex + 1, 0, movedTask);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };
    
    const handleClearTasks = () => {
        setTasks([]);
        setFilteredTasks([]);
        localStorage.removeItem('tasks');
    };
    
    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        const filteredTasks = tasks.filter((task) => {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredTasks(filteredTasks);
        if (searchQuery.length >= 3) {
            document.getElementById("header").style.opacity = 0.5;
        } else {
            document.getElementById("header").style.opacity = 1;
        }
    };
    
    return (
        <div className="App">
        <Header
        remainingTasks={filteredTasks.filter((task) => !task.isChecked).length}
        totalTasks={filteredTasks.length}
        />
        <main className="main-container">
        <div className="tasks-list">
        {filteredTasks.map((task) => (
            <Task
            key={task.id}
            task={task}
            categories={CATEGORIES}
            onCheck={handleCheckTask}
            onMoveUp={handleMoveTaskUp}
            onMoveDown={handleMoveTaskDown}
            />
            ))}
            </div>
            <button className="btn btn-add" onClick={() => setIsModalOpen(true)}>
            Ajouter une tâche
            </button>
            <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddTask={handleAddTask}
            title="Ajouter une tâche"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <Footer
            onSearchQueryChange={handleSearchQueryChange}
            onAddTask={() => setIsModalOpen(true)}
            />
            </main>
            </div>
            );
        }
        
        ReactDOM.render(<App />, document.getElementById('root'));