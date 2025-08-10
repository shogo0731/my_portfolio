from fastapi import APIRouter

router = APIRouter()

@router.get("/api/skill")
async def read_skill():
    pass

@router.post("/api/skill")
async def create_skill():
    pass

@router.put("/api/skill/{skill_id}")
async def update_skill():
    pass

@router.delete("/api/skill/{skill_id}")
async def delete_skill():
    pass