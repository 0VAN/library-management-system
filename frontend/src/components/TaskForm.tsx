import { useEffect, useState } from "react";
import { Task } from "../types";

interface Props {
  onSubmit: (task: Task) => Promise<void>;
  initial?: Task | null;
  onCancel?: () => void;
}

const defaultTask: Task = {
  title: "",
  description: "",
  status: "pending",
  due_date: new Date().toISOString().slice(0, 10),
  user_id: 1
};

const normalizeTask = (task: Task): Task => ({
  ...task,
  due_date: task.due_date.slice(0, 10)
});

export function TaskForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<Task>(initial ?? defaultTask);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) setForm(normalizeTask(initial));
  }, [initial]);

  const handleChange = (field: keyof Task) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = field === "user_id" ? Number(event.target.value) : event.target.value;
    setForm({ ...form, [field]: value } as Task);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form);
      setForm(defaultTask);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" value={form.title} onChange={handleChange("title")} required />
        </div>
        <div className="field">
          <label htmlFor="user_id">User ID</label>
          <input id="user_id" type="number" value={form.user_id} onChange={handleChange("user_id")} required />
        </div>
        <div className="field">
          <label htmlFor="due_date">Due date</label>
          <input id="due_date" type="date" value={form.due_date} onChange={handleChange("due_date")} required />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" value={form.status} onChange={handleChange("status")}> 
            <option value="pending">Pending</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" value={form.description} onChange={handleChange("description")} rows={3} />
      </div>

      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel} disabled={loading}>
            Cancel edit
          </button>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : initial ? "Update task" : "Create task"}
        </button>
      </div>
    </form>
  );
}
