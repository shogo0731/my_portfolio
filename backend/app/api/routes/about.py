from fastapi import APIRouter, status
from app.models.about import AboutPublic, AboutCreate, AboutUpdate
from app.api.deps import SessionDep
from app.crud import about as crud_about

router = APIRouter(prefix="/about", tags=["items"])

@router.get(
    "/latest", 
    response_model=AboutPublic,
    status_code=status.HTTP_200_OK
)
async def read_about(session: SessionDep):
    db_get_about = crud_about.get_latest_about(session)
    return db_get_about
    
@router.post(
    "/",
    response_model=AboutPublic,
    status_code=status.HTTP_201_CREATED
)
async def create_about(about: AboutCreate, session: SessionDep):
    db_create_about = crud_about.create_about(session, about)
    return db_create_about

@router.put(
    "/",
    response_model=AboutPublic,
    status_code=status.HTTP_200_OK
)
async def update_about(about: AboutUpdate, session: SessionDep):
    db_old_about = crud_about.get_latest_about(session)
    db_update_about = crud_about.update_about(session, db_old_about, about)
    return db_update_about

# @router.post("/image")
# async def create_about_image()