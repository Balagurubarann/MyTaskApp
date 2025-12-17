from src.extension import db
from uuid import uuid4 as uuidV4
from enum import Enum
from datetime import date

class TaskStatus(Enum):

    PENDING = 'pending'
    COMPLETED = 'completed'
    FAILED = 'failed'

class Task(db.Model):

    __tablename__ = "tasks"

    id = db.Column(db.String(128), primary_key=True, default=lambda: str(uuidV4()))
    title = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Enum(TaskStatus), nullable=False, default=TaskStatus.PENDING)
    description = db.Column(db.String(255), nullable=False)
    startDate = db.Column(db.Date, nullable=False, default=date.today())
    endDate = db.Column(db.Date, nullable=True)

    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "taskStartDate": self.startDate.isoformat() if self.startDate else None,
            "taskEndDate": self.endDate.isoformat() if self.endDate else None,
            "status": self.status.value if self.status else None
        }
