from fastapi import APIRouter, HTTPException, status
from app.api.deps import SessionDep
from app.models import (Message, Skill, SkillCreate, SkillUpdate, SkillsPublic,
                        SkillPublic)
from app.crud import skill as crud_skill
from app.utils import err_mes_item_with_id_not_found, mes_delete_success

router = APIRouter(prefix="/skill", tags=["skill"])


@router.get("/", response_model=SkillsPublic, status_code=status.HTTP_200_OK)
async def read_skill(session: SessionDep):
    skill: SkillsPublic = crud_skill.read_skill(session)
    return skill


@router.post("/",
             response_model=SkillPublic,
             status_code=status.HTTP_201_CREATED)
async def create_skill(session: SessionDep, skill_in: SkillCreate):
    new_skill = crud_skill.create_skill(session, skill_in)
    return new_skill


@router.put("/{skill_id}",
            response_model=SkillPublic,
            status_code=status.HTTP_200_OK)
async def update_skill(session: SessionDep, skill_id: str,
                       skill_in: SkillUpdate):
    old_skill = session.get(Skill, skill_id)
    if not old_skill:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=err_mes_item_with_id_not_found(
                                Skill.__tablename__, skill_id))
    updated_skill = crud_skill.update_skill(session, old_skill, skill_in)
    return updated_skill


@router.delete("/{skill_id}",
               response_model=Message,
               status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(session: SessionDep, skill_id: str):
    crud_skill.delete_skill(session, skill_id)
    return Message(message=mes_delete_success(Skill.__tablename__, skill_id))
