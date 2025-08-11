from uuid import UUID
from sqlmodel import SQLModel, Field, Relationship
from app.schemas.project import Project

class TechBase(SQLModel):
    project_id: UUID
    tech: str

class Tech(TechBase, table=True):
    project_id: UUID = Field(foreign_key='project.project_id', default=None)
    project: Project = Relationship(back_populates='teches')
