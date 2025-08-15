import os
from fastapi import APIRouter, status, Form, UploadFile
from app.api.routes.utils import create_upload_path
from app.models import AboutPublic, AboutCreate, AboutUpdate
from app.api.deps import SessionDep
from app.crud import about as crud_about

router = APIRouter(prefix="/about", tags=["about"])


@router.get("/", response_model=AboutPublic, status_code=status.HTTP_200_OK)
async def read_about(session: SessionDep):
    about = crud_about.read_about(session)
    return about


@router.post("/",
             response_model=AboutPublic,
             status_code=status.HTTP_201_CREATED)
async def create_about(session: SessionDep, about_in: AboutCreate):
    new_about = crud_about.create_about(session, about_in)
    return new_about


@router.put("/", response_model=AboutPublic, status_code=status.HTTP_200_OK)
async def update_about(about_in: AboutUpdate, session: SessionDep):
    old_about = crud_about.read_about(session)
    updated_about = crud_about.update_about(session, old_about, about_in)
    return updated_about


# ファイルアップロード用パスオペレーション関数
@router.post("/{about_id}/image",
             response_model=AboutPublic,
             status_code=status.HTTP_201_CREATED)
async def create_about_image(session: SessionDep,
                             about_id: str,
                             ufile: UploadFile = Form()):
    # 画像のバイナリデータを取得
    bf = await ufile.read()

    # ファイルの拡張子を取得
    ext = os.path.splitext(ufile.filename)[1]

    # ファイルに書き込む
    upload_path = create_upload_path("about", about_id, ext)
    with open(upload_path, 'wb') as f:
        f.write(bf)

    # 画像を保存するデータを取得
    about = crud_about.read_about(session, about_id)
    about.image_path = upload_path
    session.add(about)
    session.commit()
    session.refresh(about)
    return about


@router.put("/{about_id}/image",
            response_model=AboutPublic,
            status_code=status.HTTP_200_OK)
async def update_about_image(session: SessionDep,
                             about_id: str,
                             ufile: UploadFile = Form()):
    # 画像のバイナリデータを取得
    bf = await ufile.read()

    # ファイルの拡張子を取得
    ext = os.path.splitext(ufile.filename)[1]

    # ファイルに書き込む
    upload_path = create_upload_path("about", about_id, ext)
    with open(upload_path, 'wb') as f:
        f.write(bf)

    # 画像を保存するデータを取得
    about = crud_about.read_about(session, about_id)
    about.image_path = upload_path
    session.add(about)
    session.commit()
    session.refresh(about)
    return about
