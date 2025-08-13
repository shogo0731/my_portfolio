from fastapi import APIRouter, status
from app.models.skill import Skill, SkillCreate, SkillUpdate

router = APIRouter(prefix="/skill", tags=["skill"])


@router.get("/skill", response_model=Skill, status_code=status.HTTP_200_OK)
async def read_skill():
    pass


@router.post("/skill", status_code=status.HTTP_201_CREATED)
async def create_skill(skill: SkillCreate):
    pass


@router.put("/skill/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_skill(skill_id: str, skill: SkillUpdate):
    pass


@router.delete("/skill/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: str):
    pass
