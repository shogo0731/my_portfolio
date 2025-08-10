from fastapi import APIRouter

router = APIRouter()

@router.get("/api/about/latest")
async def read_about():
    pass

@router.post("/api/about")
async def create_about():
    pass

@router.put("/api/about")
async def update_about():
    pass
