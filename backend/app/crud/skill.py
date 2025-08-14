from sqlmodel import Session, select
from fastapi import HTTPException, status
from app.models import (Skill, SkillPublic, SkillsPublic, SkillUpdate,
                        SkillCreate)
from app.utils import err_mes_item_with_id_not_found


def read_skill(session: Session, skill_id: str = None):
    if skill_id:
        skill: SkillPublic = session.get(Skill, skill_id)
        if not skill:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=err_mes_item_with_id_not_found(Skill.__tablename__,
                                                      skill_id))
        return skill
    statement = select(Skill)
    skills = session.exec(statement)
    return SkillsPublic(data=skills)


def create_skill(session: Session, skill_in: SkillCreate):
    skill = Skill.model_validate(skill_in)
    session.add(skill)
    session.commit()
    session.refresh(skill)
    return skill


def update_skill(session: Session, old_skill: Skill, skill_in: SkillUpdate):
    update_data = skill_in.model_dump(exclude_unset=True)
    old_skill.sqlmodel_update(update_data)
    session.add(old_skill)
    session.commit()
    session.refresh(old_skill)
    return old_skill


def delete_skill(session: Session, skill_id: str):
    skill = session.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=err_mes_item_with_id_not_found(
                                Skill.__tablename__, skill_id))
    session.delete(skill)
    session.commit()
    return
