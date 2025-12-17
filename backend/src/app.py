from flask import Flask
from .extension import db
from .lib.database import create_database_if_not_exists as create_db
from src.routes.task_route import task_bp
from flask_cors import CORS

def create_app():

    app = Flask(__name__)

    CORS(app, origins=['http://localhost:5173'])

    app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://root:root@localhost/task_app_db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    create_db()

    app.register_blueprint(task_bp)

    return app
