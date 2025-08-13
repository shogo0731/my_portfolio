from sqlmodel import Session, select
from app.models.about import About, AboutCreate, AboutUpdate
from fastapi import HTTPException, status


def get_latest_about(session: Session):
    statement = select(About)
    session_about = session.exec(statement).first()
    return session_about


def get_about(about_id: str, session: Session):
    db_about = session.get(About, about_id)

    # db_aboutが存在しない場合エラーを起こす
    if not db_about:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return db_about


def create_about(session: Session, about_create: AboutCreate):
    about = About.model_validate(about_create)
    session.add(about)
    session.commit()
    session.refresh(about)
    return about


def update_about(session: Session, about: About, about_update: dict):
    about.sqlmodel_update(about_update)
    session.add(about)
    session.commit()
    session.refresh(about)
    return about
