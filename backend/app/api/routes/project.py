from fastapi import APIRouter, status
from app.schemas.project import ProjectInDB, ProjectCreate, ProjectUpdate

router = APIRouter()

@router.get(
    "/api/project",
    response_model=ProjectInDB,
    status_code=status.HTTP_200_OK
)
async def read_project():
    pass

@router.post("/api/project", status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate):
    pass

@router.put("/api/project/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_project(project_id: str, project: ProjectUpdate):
    pass

@router.delete("/api/project/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str):
    pass