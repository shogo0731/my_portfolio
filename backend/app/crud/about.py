from uuid import UUID
from sqlmodel import Session, select, desc
from app.models import About, AboutCreate, AboutUpdate
from fastapi import HTTPException, status
from app.utils import err_mes_item_with_id_not_found


def read_about(session: Session, about_id: UUID = None):
    # about_idが指定された場合
    if about_id:
        about = session.get(About, about_id)

        # aboutが存在しない場合エラーを起こす
        if not about:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=err_mes_item_with_id_not_found(
                                    About.__tablename__, about_id))
        return about

    # about_idが指定されていない場合、最新のaboutを取り出す
    statement = select(About).order_by(desc(About.updated_at))
    about = session.exec(statement).first()

    # aboutが存在しない場合エラーを起こす
    if not about:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="project was not found")
    return about


def create_about(session: Session, about_in: AboutCreate):
    about = About.model_validate(about_in)
    session.add(about)
    session.commit()
    session.refresh(about)
    return about


def update_about(session: Session, old_about: About, about_in: AboutUpdate):
    update_data = about_in.model_dump(exclude_unset=True)
    old_about.sqlmodel_update(update_data)
    session.add(old_about)
    session.commit()
    session.refresh(old_about)
    return old_about
