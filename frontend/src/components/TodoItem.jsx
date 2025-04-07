import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import TodoEdit from './TodoEdit';
import TodoDelete from './TodoDelete';
import axios from 'axios';

const TodoItem = ({ todo, onTodoUpdated, onTodoDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleComplete = async () => {
    try {
      const { data } = await axios.put(`/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      onTodoUpdated(data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <li className="p-3 border rounded flex justify-between items-center">
      {isEditing ? (
        <TodoEdit
          todo={todo}
          onCancel={() => setIsEditing(false)}
          onTodoUpdated={(updatedTodo) => {
            onTodoUpdated(updatedTodo);
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleComplete}
              className={`p-1 rounded-full ${
                todo.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {todo.completed ? <FaCheck size={12} /> : <FaTimes size={12} />}
            </button>
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              {todo.title}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => setIsDeleting(true)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
      {isDeleting && (
        <TodoDelete
          todoId={todo._id}
          onCancel={() => setIsDeleting(false)}
          onTodoDeleted={() => {
            onTodoDeleted(todo._id);
            setIsDeleting(false);
          }}
        />
      )}
    </li>
  );
};

export default TodoItem;