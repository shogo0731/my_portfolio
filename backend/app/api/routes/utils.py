# utility
from typing import Literal


def create_upload_path(dir_name: Literal["about", "project"], file_name: str,
                       ext: str):
    return f"/backend/uploads/image/{dir_name}/{file_name}{ext}"
