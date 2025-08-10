#aboutテーブルの型定義

from sqlalchemy import Column, String
from app.db.base_class import Base

"""
Columの引数
primary_key: 主キーかどうか
autoincrement: インクリメントをするかどうか
server_default: デフォルト値を設定する
nullable: nullを許可するかどうか。
unique: テーブルで一意な値かどうか。Trueで重複を禁止。
"""


class About(Base):
    about_id = Column(String, primary_key=True, nullable=False, unique=True)
    description = Column(String, nullable=False, unique=False)
    image_path = Column(String, nullable=True, unique=False)
