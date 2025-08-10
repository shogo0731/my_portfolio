from fastapi import APIRouter
from endpoints import about, skill, project, tech

api_router = APIRouter()
api_router.include_router(about.router)
api_router.include_router(skill.router)
api_router.include_router(project.router)
api_router.include_router(tech.router)
