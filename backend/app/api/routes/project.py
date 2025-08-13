from fastapi import APIRouter, status
from app.models.project import ProjectsPublic, ProjectCreate, ProjectUpdate

router = APIRouter(prefix="/project", tags=["project"])

@router.get(
    "/",
    response_model=ProjectsPublic,
    status_code=status.HTTP_200_OK
)
async def read_project():
    pass

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate):
    pass

@router.put("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_project(project_id: str, project: ProjectUpdate):
    pass

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str):
    pass