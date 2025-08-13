from fastapi import FastAPI
import uvicorn
from app.api.main import api_router
from app.core.db import init_db
from app.core.config import settings
from starlette.middleware.cors import CORSMiddleware


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

def main():
    init_db()
    
    # cors対策
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.FRONTEND_HOST],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )    
    
    # prefixによって/api/v1/... がエンドポイントとなる
    app.include_router(api_router, prefix=settings.API_V1_STR)

main()