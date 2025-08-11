from typing import Literal
from pydantic import PostgresDsn, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # envファイルの場所
        env_file='../../.env',
        env_file_encoding='utf-8',
        
        # このクラスにない環境変数の読み込み時、エラーを発生させない
        extra='ignore'
    )

    ENVIRONMENT: Literal["development", "production"] = "development"

    #エンドポイントのprefix
    API_V1_STR: str = "/api/v1"
    FRONTEND_HOST: str = "http://localhost:3000"

    PROJECT_NAME: str = "My_Portfolio"
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: str
    
    # SQLALCHEMY_DATABASE_URIを他フィールドから作成する
    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

settings = Settings()