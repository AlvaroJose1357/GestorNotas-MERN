/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function TaskList({ tasks, eliminarTarea, getTaskById }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.text}
          <div>
            <button
              onClick={() => getTaskById(task._id)}
              className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => eliminarTarea(task._id)}
              className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
