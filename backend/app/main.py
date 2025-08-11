from fastapi import FastAPI
from app.api.main import api_router
from app.core.db import init_db
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

def main():
    init_db()
    
    # prefixによって/api/v1/... がエンドポイントとなる
    app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    main()