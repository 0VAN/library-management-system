import { Task } from "../types";

const headers = { "Content-Type": "application/json" };

export async function fetchTasks(userId?: number): Promise<Task[]> {
  const query = userId ? `?user_id=${userId}` : "";
  const response = await fetch(`/api/tasks${query}`);
  if (!response.ok) throw new Error("Failed to load tasks");
  return response.json();
}

export async function createTask(payload: Task): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers,
    body: JSON.stringify({ task: payload })
  });
  if (!response.ok) throw new Error("Could not create task");
  return response.json();
}

export async function updateTask(id: number, payload: Task): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ task: payload })
  });
  if (!response.ok) throw new Error("Could not update task");
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Could not delete task");
}
