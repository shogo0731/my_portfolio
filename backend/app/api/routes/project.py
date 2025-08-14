import os
from glob import glob
from fastapi import APIRouter, status, Form, UploadFile, HTTPException
from app.models import (Project, ProjectsPublic, ProjectPublic, ProjectCreate,
                        ProjectUpdate)
from app.crud import project as crud_project
from app.api.deps import SessionDep

router = APIRouter(prefix="/project", tags=["project"])


@router.get("/", response_model=ProjectsPublic, status_code=status.HTTP_200_OK)
async def read_project(session: SessionDep):
    new_projects = crud_project.read_project(session)
    return new_projects


@router.get("/{project_id}",
            response_model=ProjectPublic,
            status_code=status.HTTP_200_OK)
async def read_project_with_id(project_id: str, session: SessionDep):
    new_projects = crud_project.read_project(session, project_id)
    return new_projects


@router.post("/",
             response_model=ProjectPublic,
             status_code=status.HTTP_201_CREATED)
async def create_project(session: SessionDep, project_in: ProjectCreate):
    new_project = crud_project.create_projct(session, project_in)
    return new_project


@router.put("/{project_id}",
            response_model=ProjectPublic,
            status_code=status.HTTP_200_OK)
async def update_project(session: SessionDep, project_id: str,
                         project_in: ProjectUpdate):
    old_project = session.get(Project, project_id)
    if not old_project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    updated_project = crud_project.update_project(session, old_project,
                                                  project_in)
    return updated_project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str, session: SessionDep):
    crud_project.delete_project(session, project_id)
    return {"message": "project deleted successfully"}


@router.post("/{project_id}/image",
             response_model=ProjectPublic,
             status_code=status.HTTP_201_CREATED)
async def create_project_iamge(session: SessionDep,
                               project_id: str,
                               ufile: UploadFile = Form()):
    # 画像のバイナリデータを取得
    bf = await ufile.read()

    # ファイルの拡張子を取得
    ext = os.path.splitext(ufile.filename)[1]

    # ファイルに書き込む
    upload_path = f'./uploads/image/project/{project_id}{ext}'
    with open(upload_path, 'wb') as f:
        f.write(bf)

    # 画像パスの情報を更新するデータを取得
    old_project = crud_project.read_project(session, project_id)
    old_project.image_path = upload_path
    session.add(old_project)
    session.commit()
    session.refresh(old_project)
    return old_project


@router.put("/{project_id}/image",
            response_model=ProjectPublic,
            status_code=status.HTTP_200_OK)
async def update_project_image(session: SessionDep,
                               project_id: str,
                               ufile: UploadFile = Form()):
    # 画像のバイナリデータを取得
    bf = await ufile.read()

    # ファイルの拡張子を取得
    ext = os.path.splitext(ufile.filename)[1]

    # ファイルに書き込む
    upload_path = f'./uploads/image/project/{project_id}{ext}'
    with open(upload_path, 'wb') as f:
        f.write(bf)

    # 画像パスの情報を更新するデータを取得
    old_project = crud_project.read_project(session, project_id)
    old_project.image_path = upload_path
    session.add(old_project)
    session.commit()
    session.refresh(old_project)
    return old_project


@router.delete("/{project_id}/image", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project_image(session: SessionDep, project_id: str):
    # project_idから該当ファイルを取得
    img_pattern = f'./uploads/image/project/{project_id}.*'
    img_path_lst = glob(img_pattern)

    # パターンにマッチする画像が一つかどうか確認。違う場合はエラーを起こす
    if len(img_path_lst) != 1:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='faild to get project image to delete')

    # 画像を削除
    img_path = img_path_lst[0]
    os.remove(img_path)

    # 削除できているか確認。できていない場合はエラーを起こす
    if os.path.isfile(img_path):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='failed to delete project image')

    # 画像パスの情報を更新するデータを取得
    old_project = crud_project.read_project(session, project_id)

    # image_pathフィールドをNoneに設定
    old_project.image_path = None
    session.add(old_project)
    session.commit()
    session.refresh(old_project)
    return {"message": "deleted project image successfully"}
