from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field


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
