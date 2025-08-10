from fastapi import APIRouter

router = APIRouter()

@router.get("/api/tech")
async def read_tech():
    pass

@router.post("/api/tech")
async def create_tech():
    pass

@router.delete("/api/tech/{project_id}")
async def delete_tech():
    pass