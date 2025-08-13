from typing import Optional, TYPE_CHECKING
from uuid import UUID, uuid4
from pydantic import NewPath, HttpUrl
from sqlmodel import SQLModel, Field, Relationship
from app.models.tech import Tech

# project.pyとtech.pyの間で循環参照していることへの対策
if TYPE_CHECKING:
    from app.models.tech import Tech

class ProjectBase(SQLModel):
    title: str
    description: str
    image_path: Optional[NewPath] = None
    live_demo_url: Optional[HttpUrl] = None
    github_url: Optional[HttpUrl] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectPublic(ProjectBase):
    project_id: UUID = Field(default_factory=lambda: str(uuid4()), primary_key=True)

class ProjectsPublic(SQLModel):
    data: list[ProjectPublic]

class Project(ProjectBase, table=True):
    project_id: UUID = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    image_path: Optional[str] = None
    live_demo_url: Optional[str] = None
    github_url: Optional[str] = None
    teches: list["Tech"] = Relationship(back_populates='project')
