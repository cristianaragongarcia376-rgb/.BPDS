"use client";

import { table } from "console";
import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
 };

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Crear tarea ( al presionar Enter)
  const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e. key === "Enter" && input.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };
  
  //tachar 
  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((tasks) => 
         tasks.id === id ? {...tasks, completed: !tasks.completed } : tasks
      )
    );
  };

  // iniciar edicion 
  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // Guardar edicion
  const saveEdit = () => {
    if (editText.trim()!== "" && editingId !== null) {
      setTasks(
         tasks.map((task) =>
           task.id === editingId ? {...task, text: editText.trim() } : task
       )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  // Eliminar tarea 
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((tasks) => tasks.id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1> TODO List</h1>

      {[/* Input para crear tarea */]}
      <input
      type="text"
      placeholder="Escribe tu tarea y presiona enter.."
      value={input}
      onChange={(e) => setInput(e. target.value)}
      onKeyDown={handlekeyDown}
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    />

    {/* Lista de tareas */}
    <ul style={{ listStyle: "none", padding: 0, marginTop: 20}}>
      {tasks.map((tasks) => (
        <li
         key={tasks.id}
         style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
           background: "#f9f9f9",
           padding: "10px 15px",
           marginBottom: 8,
           borderRadius: 8,
           border: "1px solid #eee"
         }}
       >
        {/* checkbox */}
        <input
        type = "checkbox"
        checked={tasks.completed}
        onChange={() => toggleComplete(tasks.id)}
        style={{ marginRight: 12, width: 18, height: 18 }}
        />

        {/* Texto de la tarea */}
        {editingId === tasks.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === "enter" && saveEdit()}
            autoFocus
            style={{
              flex: 1,
              padding: "6px 10px",
              fontSize: "16px",
              border: "1px solid #0070f3",
              borderRadius: 4,
             }}
          /> 
        ) : (
          <span
          onClick={() => startEditing(tasks.id, tasks.text)}
          style={{
            flex: 1,
            textDecoration: tasks.completed ? "line-through" : "none",
            color: tasks.completed ? "#888" : "#000",
            cursor: "pointer",
          }}
          >
            {tasks.text}
          </span>
        )}

        {/* Boton eliminar*/}
        <button
        onClick={() => deleteTask(tasks.id)}
        style={{
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: "14px",
        }}
        >
          x Eliminar
        </button>
     /</li>
    ))}
  </ul>

  {tasks.length === 0 && (
    <p style={{ color: "#999", textAlign: "center", marginTop: 30}}>
      No hay tareas. ¡Agrega una!
    </p>
  )}
</div> 
);
                                }