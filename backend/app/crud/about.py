from sqlmodel import Session, select
from app.models.about import About, AboutCreate, AboutUpdate

def get_latest_about(session: Session):
    statement = select(About)
    session_about = session.exec(statement).first()
    return session_about

def create_about(session: Session, about_create: AboutCreate):
    db_about = About.model_validate(about_create)
    session.add(db_about)
    session.commit()
    session.refresh(db_about)
    return db_about

def update_about(session: Session, db_about: About, about_update: AboutUpdate):
    about_data = about_update.model_dump(exclude_unset=True)
    db_about.sqlmodel_update(about_data)
    session.add(db_about)
    session.commit()
    session.refresh(db_about)
    return db_about