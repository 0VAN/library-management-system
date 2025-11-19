class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.string :status, null: false, default: "pending"
      t.datetime :due_date, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :tasks, :user_id
  end
end
