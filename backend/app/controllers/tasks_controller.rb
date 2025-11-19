class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  # GET /api/tasks
  def index
    tasks = params[:user_id].present? ? Task.where(user_id: params[:user_id]) : Task.all
    render json: tasks.order(:due_date)
  end

  # GET /api/tasks/:id
  def show
    render json: @task
  end

  # POST /api/tasks
  def create
    task = Task.create!(task_params)
    render json: task, status: :created
  end

  # PATCH/PUT /api/tasks/:id
  def update
    @task.update!(task_params)
    render json: @task
  end

  # DELETE /api/tasks/:id
  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :due_date, :user_id)
  end
end
