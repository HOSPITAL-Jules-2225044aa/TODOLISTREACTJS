import React from 'react';
import Categories from './Categories';
import Modal from './Modal';

function Footer({ onSearchQueryChange, onAddTask }) {
    return (
        <footer className="footer">
        <Categories />
        <input
        type="text"
        placeholder="Rechercher une tâche..."
        onChange={onSearchQueryChange}
        />
        <button className="btn btn-add" onClick={onAddTask}>
        Ajouter une tâche
        </button>
        </footer>
        );
    }
    
    export default Footer;