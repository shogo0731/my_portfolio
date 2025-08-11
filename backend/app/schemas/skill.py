from uuid import UUID
from sqlmodel import SQLModel, Field

class SkillBase(SQLModel):
    skill_id: UUID
    title: str
    description: str
    icon: str

class SkillCreate(SkillBase):
    pass

class SkillUpdate(SkillBase):
    pass

class SkillPublic(SkillBase):
    pass

class SKillsPublic(SQLModel):
    data: list[SkillPublic]

class Skill(SkillBase, table=True):
    skill_id: UUID = Field(primary_key=True, default=None)
