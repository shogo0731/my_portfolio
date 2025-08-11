from typing import Optional, List
from uuid import UUID
from pydantic import NewPath, HttpUrl
from sqlmodel import SQLModel, Field, Relationship
from app.schemas.tech import Tech

class ProjectBase(SQLModel):
    project_id: UUID
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
    pass

class ProjectsPublic(SQLModel):
    data: list[ProjectPublic]

class Project(ProjectBase, table=True):
    project_id: UUID = Field(primary_key=True, defualt=None)
    teches: List[Tech] = Relationship(back_populates='project')