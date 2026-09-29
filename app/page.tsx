"use client";

import { table } from "console";
import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  deletedAt?: number;
 };

export default function Home(): import("react").JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const[deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Crear tarea ( al presionar Enter)
  const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
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

  // Agregar a eliminadas
  const addToDeleted = (task: Task) => {
    const deletedTask: Task = { ...task, deletedAt: Date.now() };
    setDeletedTasks([deletedTask, ...deletedTasks]);
  };

  // Eliminar tarea 
  const deleteTask = (id: number) => {
    const taskToDlete = tasks.find((task) => task.id === id);

    if (taskToDlete) {
      addToDeleted(taskToDlete );
      setTasks (tasks.filter((task) => task.id !== id));

    }
    
  };

  // Restaurar tarear eliminadas
  const restoreTask = ( id: number) => {
    const taskToRestore = deletedTasks.find((task) => task.id === id);
    if (taskToRestore ) {
      setDeletedTasks(deletedTasks.filter((task) => task.id !== id));
      const { deletedAt, ...taskWitthoutDate } = taskToRestore;
      setTasks([...tasks, taskWitthoutDate]);
    }
  };

  // vaciar lista de eliminadas
  const clearDeleted = () => {
    setDeletedTasks([]);
  };

  return (
   <div
    style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >


    <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 20,
          padding: "40px 35px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
     >
        {/* Título */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#333",
            margin: "0 0 10px 0",
            textAlign: "center",
          }}
        >
          📋 TODO List
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#000",
            marginBottom: 30,
            fontSize: "0.95rem",
          }}
        >
          Organiza tus tareas de forma simple y rápida
        </p>

        {/* Input principal */}
        <input
          type="text"
          placeholder="✍️ Escribe una tarea y presiona Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handlekeyDown}
          style={{
            width: "100%",
            padding: "16px 20px",
            fontSize: "16px",
            border: "2px solid #e0e0e0",
            borderRadius: 12,
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.boxShadow = "none";
          }}
        />

        {/* ============ LISTA PRINCIPAL ============ */}
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                color: "#000",
                margin: 0,
                fontWeight: 600,
              }}
            >
              ✅ Tareas pendientes
            </h2>
            <span
              style={{
                background: "#667eea",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {tasks.length}
            </span>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: task.completed ? "#f0fdf4" : "#fafafa",
                  padding: "14px 18px",
                  marginBottom: 10,
                  borderRadius: 12,
                  border: "1px solid #eee",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0,0,0,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Chulito */}
                <span
                  onClick={() => toggleComplete(task.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: task.completed
                      ? "2px solid #4CAF50"
                      : "2px solid #ccc",
                    cursor: "pointer",
                    marginRight: 14,
                    background: task.completed ? "#4CAF50" : "transparent",
                    color: task.completed ? "#fff" : "transparent",
                    fontSize: "18px",
                    fontWeight: "bold",
                    userSelect: "none",
                    transition: "all 0.2s",
                  }}
                >
                  ✓
                </span>

                {/* Texto o input de edición */}
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      fontSize: "16px",
                      border: "2px solid #667eea",
                      borderRadius: 8,
                      outline: "none",
                    }}
                  />
                ) : (
                  <span
                    onClick={() => startEditing(task.id, task.text)}
                    style={{
                      flex: 1,
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#888" : "#333",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    {task.text}
                  </span>
                )}

                {/* Botón eliminar */}
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: "#fee",
                    color: "#e74c3c",
                    border: "1px solid #fcc",
                    borderRadius: 8,
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e74c3c";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fee";
                    e.currentTarget.style.color = "#e74c3c";
                  }}
                >
                  ✕ Eliminar
                </button>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <p
              style={{
                color: "#000",
                textAlign: "center",
                marginTop: 30,
                fontSize: "15px",
              }}
            >
              No hay tareas pendientes. ¡Agrega una! ✨
            </p>
          )}
        </div>

        {/* ============ LISTA DE ELIMINADAS ============ */}
        <div
          style={{
            marginTop: 50,
            paddingTop: 25,
            borderTop: "2px dashed #e0e0e0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2
                style={{
                  fontSize: "1.1rem",
                  color: "#000",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                🗑️ Tareas eliminadas
              </h2>
              <span
                style={{
                  background: "#eee",
                  color: "#666",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {deletedTasks.length}
              </span>
            </div>
            {deletedTasks.length > 0 && (
              <button
                onClick={clearDeleted}
                style={{
                  background: "transparent",
                  color: "#e74c3c",
                  border: "1px solid #e74c3c",
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e74c3c";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#e74c3c";
                }}
              >
                Vaciar lista
              </button>
            )}
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {deletedTasks.map((task) => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fafafa",
                  padding: "12px 18px",
                  marginBottom: 8,
                  borderRadius: 10,
                  border: "1px dashed #ddd",
                  color: "#888",
                  fontSize: "15px",
                }}
              >
                <span
                  style={{
                    flex: 1,
                    textDecoration: "line-through",
                    color: "#aaa",
                  }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => restoreTask(task.id)}
                  style={{
                    background: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#2980b9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#3498db";
                  }}
                >
                  ↺ Restaurar
                </button>
              </li>
            ))}
          </ul>

          {deletedTasks.length === 0 && (
            <p
              style={{
                color: "#000",
                textAlign: "center",
                marginTop: 20,
                fontSize: "14px",
              }}
            >
              Aún no has eliminado ninguna tarea.
            </p>
          )}
        </div>
      </div>

      {/* Pie de página */}
      <p
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.7)",
          marginTop: 30,
          fontSize: "13px",
        }}
      >
        Hecho en Next.js
      </p>
    </div>
  );
}   
