import { Task } from "../types";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => Promise<void>;
}

export function TaskList({ tasks, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Create one above.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article key={task.id} className="task-card">
          <div className="task-meta">
            <span className="status-pill">{task.status.replace("_", " ")}</span>
            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
          </div>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <small>Assigned to user #{task.user_id}</small>
          <div className="form-actions" style={{ justifyContent: "flex-start" }}>
            <button onClick={() => onEdit(task)}>Edit</button>
            {task.id && (
              <button className="secondary" onClick={() => onDelete(task.id!)}>
                Delete
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
