class Task < ApplicationRecord
  validates :title, :status, :due_date, :user_id, presence: true
  validates :status, inclusion: { in: %w[pending in_progress completed archived] }
end
