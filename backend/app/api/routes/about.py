from fastapi import APIRouter, status
from app.schemas.about import About, AboutCreate, AboutUpdate

router = APIRouter()

@router.get(
    "/about/latest", 
    response_model=About,
    status_code=status.HTTP_200_OK
)
async def read_about():
    pass

@router.post("/about", status_code=status.HTTP_201_CREATED)
async def create_about(about: AboutCreate):
    pass

@router.put("/about", status_code=status.HTTP_204_NO_CONTENT)
async def update_about(about: AboutUpdate):
    pass
