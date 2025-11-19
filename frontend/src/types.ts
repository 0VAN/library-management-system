export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed" | "archived";
  due_date: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}
