from typing import Optional
from uuid import UUID, uuid4
from pydantic import NewPath
from sqlmodel import SQLModel, Field

# Aboutの基底クラス
class AboutBase(SQLModel):
    description: str
    image_path: Optional[NewPath] = None

# postのリクエストボディの型
class AboutCreate(AboutBase):
    pass

# putのリクエストボディの型
class AboutUpdate(AboutBase):
    pass

# getのレスポンスの型
class AboutPublic(AboutBase):
    about_id: UUID = Field(default_factory=lambda: str(uuid4()), primary_key=True)

# データベースのAboutテーブルの型
class About(AboutBase, table=True):
    about_id: UUID = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    image_path: Optional[str] = None
    
