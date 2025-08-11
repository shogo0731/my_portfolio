from typing import Optional
from uuid import UUID
from pydantic import NewPath
from sqlmodel import SQLModel, Field

# Aboutの基底クラス
class AboutBase(SQLModel):
    about_id: UUID
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
    pass

# データベースのAboutテーブルの型
class About(AboutBase, table=True):
    about_id: UUID = Field(primary_key=True, default=None)
