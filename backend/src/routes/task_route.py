from src.extension import db
from src.models.Task import Task
from flask import request, jsonify, Blueprint

task_bp = Blueprint("task", __name__, url_prefix='/api')

@task_bp.route('/add-task', methods=['POST'])
def add_task():

   try:

        data = request.get_json()

        if not data or 'title' not in data or 'status' not in data or 'description' not in data:

            return jsonify({ "message": "All fields are required" }), 400

        task = Task(
                title=data.get('title'),
                status=data.get('status'),
                description=data.get('description'),
                startDate=data.get('taskStartDate'),
                endDate=data.get('taskEndDate')
            )

        db.session.add(task)
        db.session.commit()

        return jsonify({ "message": "Task added", "task": task.to_dict() }), 201

   except Exception as Ex:

      print("Error Happened: ", Ex)
      return jsonify({ "message": f"Error happened while adding, {Ex}" }), 500


@task_bp.route('/tasks', methods=['GET'])
def get_tasks():

    try:

        tasks = db.session.execute(db.select(Task)).scalars().all()

        return jsonify({ "message": "Tasks Fetched", "tasks": [task.to_dict() for task in tasks] }), 200

    except Exception as Ex:

        print("Error Happened: ", Ex)
        return jsonify({ "message": f"Error happened while fetching, {Ex}" }), 500
