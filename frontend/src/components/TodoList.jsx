import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get('/api/todos');
      setTodos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoCreated = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleTodoDeleted = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoCreate onTodoCreated={handleTodoCreated} />
      <div className="mt-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add one!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onTodoUpdated={handleTodoUpdated}
                onTodoDeleted={handleTodoDeleted}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;