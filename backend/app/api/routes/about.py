from fastapi import APIRouter, status
from app.schemas.about import AboutInDB, AboutCreate, AboutUpdate

router = APIRouter()

@router.get(
    "/api/about/latest", 
    response_model=AboutInDB,
    status_code=status.HTTP_200_OK
)
async def read_about():
    pass

@router.post("/api/about", status_code=status.HTTP_201_CREATED)
async def create_about(about: AboutCreate):
    pass

@router.put("/api/about", status_code=status.HTTP_204_NO_CONTENT)
async def update_about(about: AboutUpdate):
    pass
