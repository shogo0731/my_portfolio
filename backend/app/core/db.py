from sqlmodel import SQLModel, create_engine
from app.core.config import settings

# dbに接続
engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# dbおよびテーブル作成
def init_db():
    SQLModel.metadata.create_all(engine)
