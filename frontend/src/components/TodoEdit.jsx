import { useState } from 'react';
import axios from 'axios';

const TodoEdit = ({ todo, onCancel, onTodoUpdated }) => {
  const [title, setTitle] = useState(todo.title);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || title === todo.title) {
      onCancel();
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.put(`/api/todos/${todo._id}`, { title });
      onTodoUpdated(data);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex space-x-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  );
};

export default TodoEdit;