import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [activeID, setActiveID] = useState("");

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const response = await fetch("http://localhost:3000/notas");
      if (!response.ok) {
        throw new Error("Error al cargar las notas");
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error(`Error al cargar las notas ${error}`);
    }
  };

  const agregarTarea = async (text) => {
    console.log(text);
    try {
      await fetch("http://localhost:3000/notas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      cargarTareas();
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };

  const eliminarTarea = async (id) => {
    console.log(id);
    try {
      await fetch(`http://localhost:3000/notas/${id}`, {
        method: "DELETE",
      });
      cargarTareas();
    } catch (error) {
      console.error(`Error al eliminar la nota ${error}`);
    }
  };

  const editarTarea = async (id, text) => {
    console.log(id, text);
    try {
      await fetch(`http://localhost:3000/notas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      cargarTareas();
      setActiveID("");
    } catch (error) {
      console.error(`Error al modificar la nota ${error}`);
    }
  };

  const getTaskById = async (id) => {
    const task = tasks.find((task) => task._id === id);
    console.log(task);
    setActiveID(task);
  };

  return (
    <div>
      <TaskForm
        agregarTarea={agregarTarea}
        editarTarea={editarTarea}
        activeID={activeID}
      />
      <TaskList
        tasks={tasks}
        eliminarTarea={eliminarTarea}
        getTaskById={getTaskById}
      />
    </div>
  );
}
