from fastapi import APIRouter
from app.api.routes import about, skill, project

api_router = APIRouter()
api_router.include_router(about.router)
api_router.include_router(skill.router)
api_router.include_router(project.router)
