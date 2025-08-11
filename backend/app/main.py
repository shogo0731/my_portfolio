from fastapi import FastAPI
from app.api.main import api_router
from app.core.db import init_db

app = FastAPI()

def init():
    init_db()

def main():
    init()
    app.include_router(api_router)

if __name__ == "__main__":
    main()