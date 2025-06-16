import { useState, useCallback } from 'react';

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/v1/todos', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch todos');
      setTodos(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = async (title, isCompleted = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/v1/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, isCompleted }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add todo');
      setTodos(prev => [...(prev || []), data.data]);
      return data.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, title, isCompleted) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, isCompleted }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update todo');
      setTodos(prev => prev.map(todo => todo._id === id ? data.data : todo));
      return data.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/v1/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete todo');
      }
      setTodos(prev => prev.filter(todo => todo._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    setTodos, // for manual updates if needed
  };
};

export default useTodo;
