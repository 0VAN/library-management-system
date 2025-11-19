import { useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTask } from "./api/tasks";
import { Task } from "./types";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (task: Task) => {
    const created = await createTask(task);
    setTasks((prev) => [...prev, created]);
    setEditing(null);
  };

  const handleUpdate = async (task: Task) => {
    if (!task.id) return;
    const updated = await updateTask(task.id, task);
    setTasks((prev) => prev.map((item) => (item.id === task.id ? updated : item)));
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const onSubmit = editing ? handleUpdate : handleCreate;

  return (
    <div className="app-shell">
      <h1>Task Manager</h1>
      <p>Ruby on Rails API with a React + TypeScript client.</p>

      <TaskForm onSubmit={onSubmit} initial={editing} onCancel={() => setEditing(null)} />

      <div className="card" style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0 }}>Tasks</h2>
          {loading && <span>Loading…</span>}
          {error && <span style={{ color: "#b91c1c" }}>{error}</span>}
        </div>
        <TaskList tasks={tasks} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
