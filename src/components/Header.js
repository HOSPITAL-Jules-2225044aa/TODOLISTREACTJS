import React from 'react';

function Header({ remainingTasks, totalTasks }) {
    return (
        <header className="header">
        <h1>To Do List</h1>
        {totalTasks > 0 && (
            <p>
            {remainingTasks} tâches restantes sur {totalTasks}
            </p>
            )}
            </header>
            );
        }
        
        export default Header;