#projectテーブルの型定義

from sqlmodel import Column, String
from app.db.base_class import Base

class Project(Base):
    project_id = Column(String, primary_key=True, nullable=False, unique=True)
    title = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=False, unique=True)
    image_path = Column(String, nullable=True, unique=True)
    live_demo_url = Column(String, nullable=True, unique=True)
    github_url = Column(String, nullable=True, unique=True)
