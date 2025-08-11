from fastapi import APIRouter, status
from app.schemas.skill import SkillCreate, SkillUpdate

router = APIRouter()

@router.get("/api/skill", status_code=status.HTTP_200_OK)
async def read_skill():
    pass

@router.post("/api/skill", status_code=status.HTTP_201_CREATED)
async def create_skill(skill: SkillCreate):
    pass

@router.put("/api/skill/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_skill(skill_id: str, skill: SkillUpdate):
    pass

@router.delete("/api/skill/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: str):
    pass
