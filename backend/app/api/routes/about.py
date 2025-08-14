import os
from fastapi import APIRouter, status, Form, UploadFile
from app.models import AboutPublic, AboutCreate, AboutUpdate
from app.api.deps import SessionDep
from app.crud import about as crud_about

router = APIRouter(prefix="/about", tags=["about"])


@router.get("/latest",
            response_model=AboutPublic,
            status_code=status.HTTP_200_OK)
async def read_about(session: SessionDep):
    db_get_about = crud_about.get_latest_about(session)
    return db_get_about


@router.post("/",
             response_model=AboutPublic,
             status_code=status.HTTP_201_CREATED)
async def create_about(about: AboutCreate, session: SessionDep):
    db_create_about = crud_about.create_about(session, about)
    return db_create_about


@router.put("/", response_model=AboutPublic, status_code=status.HTTP_200_OK)
async def update_about(about: AboutUpdate, session: SessionDep):
    db_old_about = crud_about.get_latest_about(session)
    db_update_about = crud_about.update_about(session, db_old_about, about)
    return db_update_about


# ファイルアップロード用パスオペレーション関数
@router.post("/image")
async def create_about_image(session: SessionDep,
                             about_id: str = Form(),
                             ufile: UploadFile = Form()):
    # 画像のバイナリデータを取得
    bf = await ufile.read()

    # ファイルの拡張子を取得
    ext = os.path.splitext(ufile.filename)[1]

    # ファイルに書き込む
    upload_path = f'./uploads/image/about/{about_id}{ext}'
    with open(upload_path, 'wb') as f:
        f.write(bf)

    # 画像を保存するデータを取得
    about = crud_about.get_about(about_id, session)

    # 更新データを作成
    update_data = {"image_path": upload_path}

    # 更新
    updated_about = crud_about.update_about(session, about, update_data)
    return updated_about


@router.put("/image")
async def update_about_image(session: SessionDep,
                             about_id: str = Form(),
                             ufile: UploadFile = Form()):
    # 画像のバイナリデータを取得
    bf = await ufile.read()

    # ファイルの拡張子を取得
    ext = os.path.splitext(ufile.filename)[1]

    # ファイルに書き込む
    upload_path = f'./uploads/image/about/{about_id}{ext}'
    with open(upload_path, 'wb') as f:
        f.write(bf)

    # 画像を保存するデータを取得
    about = crud_about.get_about(about_id, session)

    # 更新データを作成
    update_data = {"image_path": upload_path}

    # 更新
    updated_about = crud_about.update_about(session, about, update_data)
    return updated_about
