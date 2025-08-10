#skillテーブルの型定義

from sqlalchemy import Column, ForeignKey, String
from app.db.base_class import Base

class Tech(Base):
    project_id = Column(String, ForeignKey('project.project_id'))
    tech = Column(String, nullable=False, unique=False)
    