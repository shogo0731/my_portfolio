from uuid import UUID
from sqlmodel import SQLModel


class SkillBase(SQLModel):
    skill_id: UUID
    title: str
    description: str
    icon: str

class SkillCreate(SkillBase):
    pass

class SkillUpdate(SkillBase):
    pass

class Skill(SkillBase, table=True):
    pass
