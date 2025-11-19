Task.create!(
  [
    { title: "Draft project outline", description: "Initial structure for MVP", status: "in_progress", due_date: 1.day.from_now, user_id: 1 },
    { title: "Review pull request", description: "Check API contracts", status: "pending", due_date: 2.days.from_now, user_id: 2 }
  ]
)
