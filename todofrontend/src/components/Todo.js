import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  const handleEditTodo = () => {
    editTodo(task.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(task.id);
  };

  return (
    <div className="Todo">
      <p className={`${task.isCompleted ? 'completed' : ''}`} onClick={handleToggleComplete}>
        {task.description}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenSquare} onClick={handleEditTodo} />
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteTodo} />
      </div>
    </div>
  );
};

export default Todo;
