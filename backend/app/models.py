from typing import Optional
from uuid import UUID, uuid4
from pydantic import NewPath
from sqlmodel import Field, Relationship, SQLModel


# Aboutの基底クラス
class AboutBase(SQLModel):
    description: str


# postのリクエストボディの型
class AboutCreate(AboutBase):
    pass


# putのリクエストボディの型
class AboutUpdate(AboutBase):
    pass


# getのレスポンスの型
class AboutPublic(AboutBase):
    about_id: UUID = Field(default_factory=lambda: str(uuid4()),
                           primary_key=True)
    image_path: Optional[NewPath] = None


# データベースのAboutテーブルの型
class About(AboutBase, table=True):
    about_id: UUID = Field(default_factory=lambda: str(uuid4()),
                           primary_key=True)
    image_path: Optional[str] = Field(default=None, nullable=True)


class ProjectBase(SQLModel):
    title: str
    description: str
    live_demo_url: Optional[str]
    github_url: Optional[str]


class ProjectCreate(ProjectBase):
    techs: list[str]


class ProjectUpdate(ProjectBase):
    techs: list[str]


class ProjectPublic(ProjectBase):
    project_id: UUID = Field(default_factory=lambda: str(uuid4()),
                             primary_key=True)
    image_path: Optional[str] = None
    techs: list["Tech"]


class ProjectsPublic(SQLModel):
    data: list[ProjectPublic]


class Project(ProjectBase, table=True):
    project_id: UUID = Field(default_factory=lambda: str(uuid4()),
                             primary_key=True)
    image_path: Optional[str] = Field(default=None, nullable=True)
    live_demo_url: Optional[str] = Field(default=None, nullable=True)
    github_url: Optional[str] = Field(default=None, nullable=True)
    techs: list["Tech"] = Relationship(back_populates='project',
                                       cascade_delete=True)


class SkillBase(SQLModel):
    title: str
    description: str
    icon: str


class SkillCreate(SkillBase):
    pass


class SkillUpdate(SkillBase):
    pass


class SkillPublic(SkillBase):
    skill_id: UUID = Field(default_factory=lambda: str(uuid4()),
                           primary_key=True)


class SKillsPublic(SQLModel):
    data: list[SkillPublic]


class Skill(SkillBase, table=True):
    skill_id: UUID = Field(default_factory=lambda: str(uuid4()),
                           primary_key=True)


class TechBase(SQLModel):
    tech: str


class Tech(TechBase, table=True):
    tech_id: UUID = Field(default_factory=lambda: str(uuid4()),
                          primary_key=True)
    project_id: UUID = Field(foreign_key='project.project_id',
                             default=None,
                             ondelete="CASCADE")
    project: "Project" = Relationship(back_populates='techs')
