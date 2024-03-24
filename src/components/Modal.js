import React from 'react';

function Modal({ isOpen, onClose, onAddTask, title, value, onChange }) {
    if (!isOpen) return null;
    
    return (
        <div className="modal">
        <div className="modal-content">
        <h2>{title}</h2>
        <input type="text" value={value} onChange={onChange} placeholder="Titre de la tâche" />
        <button className="btn btn-primary" onClick={onAddTask}>
        Ajouter
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
        Annuler
        </button>
        </div>
        </div>
        );
    }
    
    export default Modal;