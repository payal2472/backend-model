import React, { useEffect, useState } from 'react';
import useTodo from '../hooks/useTodo';
import Navbar from '../components/Navbar';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);

  const {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo
  } = useTodo();

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    await addTodo(title, isCompleted);
    setTitle('');
    setIsCompleted(false);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditCompleted(todo.isCompleted);
  };

  const handleUpdate = async (id) => {
    await updateTodo(id, editTitle, editCompleted);
    setEditId(null);
    setEditTitle('');
    setEditCompleted(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Todo List</h2>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add new todo..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={e => setIsCompleted(e.target.checked)}
              className="accent-blue-600"
            />
            <span className="text-sm">Completed</span>
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            Add
          </button>
        </form>
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        {loading && <div className="text-gray-500 mb-4 text-sm">Loading...</div>}
        <ul className="space-y-2">
          {todos && todos.length > 0 ? todos.map(todo => (
            <li key={todo._id} className="flex items-center gap-2 p-2 border rounded">
              {editId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded"
                  />
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editCompleted}
                      onChange={e => setEditCompleted(e.target.checked)}
                      className="accent-blue-600"
                    />
                    <span className="text-xs">Completed</span>
                  </label>
                  <button
                    onClick={() => handleUpdate(todo._id)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                    disabled={loading}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-2 py-1 bg-gray-300 rounded text-xs"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-1 ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>{todo.title}</span>
                  <span className="text-xs text-gray-500 mr-2">{todo.isCompleted ? 'Completed' : 'Active'}</span>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-2 py-1 bg-yellow-400 rounded text-xs hover:bg-yellow-500"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          )) : (
            <li className="text-center text-gray-400">No todos found.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Todo;