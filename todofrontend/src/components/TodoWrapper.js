import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";

const API_BASE_URL = "https://localhost:5001/";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}Todo`);
        const fetchedTodos = response.data;
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(`${API_BASE_URL}Todo`, {
        description: todo,
        isCompleted: false,
      });
      const createdTodo = response.data;
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}Todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
          axios
            .put(`${API_BASE_URL}Todo/${id}`, updatedTodo)
            .catch((error) => {
              console.error("Error updating todo:", error);
            });
          return updatedTodo;
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const editTask = async (description, id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, description };
          axios
            .put(`${API_BASE_URL}Todo/${id}`, updatedTodo)
            .catch((error) => {
              console.error("Error updating todo:", error);
            });
          return updatedTodo;
        }
        return todo;
      });

      setTodos(updatedTodos);
      editTodo(id)
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {/* Display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;