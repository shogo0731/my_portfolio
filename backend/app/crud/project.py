from uuid import UUID
from sqlmodel import select, Session
from fastapi import HTTPException, status
from app.models import (Project, ProjectCreate, ProjectsPublic, ProjectUpdate)
from app.models import Tech
from app.utils import err_mes_item_with_id_not_found


def read_project(session: Session, project_id: UUID = None):
    if project_id:
        project = session.get(Project, project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=err_mes_item_with_id_not_found(
                                    Project.__tablename__, project_id))
        return project

    statement = select(Project)
    projects = session.exec(statement).all()
    return ProjectsPublic(data=projects)


def create_projct(session: Session, project_in: ProjectCreate):
    new_project = Project(title=project_in.title,
                          description=project_in.description,
                          live_demo_url=str(project_in.live_demo_url),
                          github_url=str(project_in.github_url),
                          techs=[
                              Tech(tech=project_in_tech)
                              for project_in_tech in project_in.techs
                          ])
    session.add(new_project)
    session.commit()
    session.refresh(new_project)
    return new_project


def update_project(session: Session, old_project: Project,
                   project_in: ProjectUpdate):
    old_project.title = project_in.title
    old_project.description = project_in.description
    old_project.live_demo_url = str(project_in.live_demo_url)
    old_project.github_url = str(project_in.github_url)
    old_project.techs = [
        Tech(tech=project_in_tech) for project_in_tech in project_in.techs
    ]
    session.add(old_project)
    session.commit()
    session.refresh(old_project)
    return old_project


def delete_project(session: Session, project_id: str) -> None:
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=err_mes_item_with_id_not_found(
                                Project.__tablename__, project_id))
    session.delete(project)
    session.commit()
    return
