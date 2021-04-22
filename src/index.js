import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

import "./styles.css";

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

console.log("todas las tareas: ", todoList.todos);
