#skillテーブルの型定義

from sqlalchemy import Column, String
from app.db.base_class import Base

class Skill(Base):
    skill_id = Column(String, primary_key=True, nullable=False, unique=True)
    title = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=False, unique=True)
    icon = Column(String, nullable=False, unique=True)