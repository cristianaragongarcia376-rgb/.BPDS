"use client";

import { table } from "console";
import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
 };

export default function Home() {
  const [Tasks, setTasks] = useState<Task[]>([]);
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
      setTasks([...Tasks, newTask]);
      setInput("");
    }
  }
  
  //tachar 
  const toggleComplete = (id: number) => {
    setTasks(
      Tasks.map((Tasks) => 
         Tasks.id === id ? {...Tasks, completed: !Tasks.completed } : Tasks
      )
    );
  }

  // iniciar edicion 
  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // Guardar edicion
  const saveEdit = () => {
    if (editText.trim()!== "" && editingId !== null) {
      setTasks(
         Tasks.map((task) =>
           task.id === editingId ? {...task, text: editText.trim() } : task
       )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  // Eliminar tarea 
  const deleteTask = (id: number) => {
    setTasks(Tasks.filter((Tasks) => Tasks.id !== id));
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
      {Tasks.map((Tasks) => (
        <li
         key={Tasks.id}
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
        checked={Tasks.completed}
        onChange={() => toggleComplete(Tasks.id)}
        style={{ marginRight: 12, width: 18, height: 18 }}
        />

        {/* Texto de la tarea */}
        {editingId === Tasks.id ? (
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
          onClick={() => startEditing(Tasks.id, Tasks.text)}
          style={{
            flex: 1,
            textDecoration: Tasks.completed ? "line-through" : "none",
            color: Tasks.completed ? "#888" : "#000",
            cursor: "pointer",
          }}
          >
            {Tasks.text}
          </span>
        )}

        {/* Boton eliminar*/}
        <button
        onClick={() => deleteTask(Tasks.id)}
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

  {Tasks.length === 0 && (
    <p style={{ color: "#999", textAlign: "center", marginTop: 30}}>
      No hay tareas. ¡Agrega una!
    </p>
  )}
</div> 
);
                                }