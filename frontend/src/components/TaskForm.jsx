/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function TaskForm({ agregarTarea, editarTarea, activeID }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (activeID) {
      setText(activeID.text);
    } else {
      setText("");
    }
  }, [activeID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeID) {
      // Actualizar nota existente
      editarTarea(activeID._id, text);
    } else {
      // Crear nueva nota
      agregarTarea(text);
    }
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una nota"
        required
      />
      <button type="submit">
        {activeID ? "Modificar Nota" : "Agregar Nota"}
      </button>
    </form>
  );
}
