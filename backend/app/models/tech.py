from typing import TYPE_CHECKING
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field, Relationship

# project.pyとtech.pyの間で循環参照していることへの対策
if TYPE_CHECKING:
    from app.models.project import Project


class TechBase(SQLModel):
    project_id: UUID
    tech: str


class Tech(TechBase, table=True):
    tech_id: UUID = Field(default_factory=lambda: str(uuid4()),
                          primary_key=True)
    project_id: UUID = Field(foreign_key='project.project_id', default=None)
    project: "Project" = Relationship(back_populates='teches')
