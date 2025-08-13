import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Project, Projects } from "@/app/const";
import path from "path";

// ファイル選択処理
function handleFileSelect(file: File, callback?: (dataUrl: string) => void) {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    //読み込み操作後の処理
    reader.onload = (event) => {
      if (event.target) {
        const dataUrl = event.target.result;
        if (typeof dataUrl == "string") {
          if (callback) callback(dataUrl);
        }
      }
    };

    //fileの読み込み
    reader.readAsDataURL(file);
  }
}

function ProjectComponent({
  project,
  projectId,
  projectsState,
  setProjectsState,
}: {
  project: Project;
  projectId: number;
  projectsState: Projects;
  setProjectsState: Dispatch<SetStateAction<Projects>>;
}) {
  const [isProjectImageDrag, setIsProjectImageDrag] = useState<boolean>(false);
  const [projectImageUrl, setProjectImageUrl] = useState<string>("");

  const inputTechTagRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);

  // プロジェクトの更新
  function updateProject(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    projectId: number,
    field: string
  ) {
    const updateProjects = projectsState.map((project) => {
      if (projectsState[projectId] == project) {
        return {
          ...project,
          [field]: event.target.value,
        };
      }
      return project;
    });
    setProjectsState(updateProjects);
  }

  // プロジェクトの削除
  function removeProject(projectId: number) {
    if (confirm("このプロジェクトを削除しますか？")) {
      const updateProjects = projectsState.filter(
        (project) => projectsState[projectId] !== project
      );
      setProjectsState(updateProjects);
    }
  }

  // 技術タグの追加
  function addTechTag(projectId: number) {
    const targetProject = projectsState[projectId];
    const updateProjects = projectsState.map((project) => {
      if (project == targetProject) {
        return {
          ...project,
          tech: [...targetProject.tech, inputTechTagRef.current!.value],
        };
      }
      return project;
    });
    setProjectsState(updateProjects);
  }

  // 技術タグの削除
  function removeTechTag(projectId: number, techIndex: number) {
    const targetProject = projectsState[projectId];
    const updateTech = targetProject.tech.filter(
      (techTag) => targetProject.tech[techIndex] !== techTag
    );
    const updateProjects = projectsState.map((project) => {
      if (projectsState[projectId] == project) {
        return {
          ...project,
          tech: updateTech,
        };
      }
      return project;
    });
    setProjectsState(updateProjects);
  }

  // Enterキーでの技術タグ追加
  function handleKeyEvent(
    event: KeyboardEvent<HTMLInputElement>,
    projectIndex: number
  ) {
    if (event.key == "Enter") {
      addTechTag(projectIndex);
    }
  }

  return (
    <div>
      <div className="item-header">
        <div className="item-title">プロジェクト #{projectId}</div>
        <button
          className="btn btn-danger"
          onClick={() => removeProject(projectId)}
        >
          削除
        </button>
      </div>
      <div className="form-group">
        <label>タイトル</label>
        <input
          type="text"
          value={project.title}
          onChange={(event) => updateProject(event, projectId, "title")}
        />
      </div>
      <div className="form-group">
        <label>説明</label>
        <textarea
          onChange={(event) => updateProject(event, projectId, "description")}
          value={project.description}
        ></textarea>
      </div>
      <div className="form-group">
        <label>プロジェクト画像</label>
        <div
          className={
            isProjectImageDrag
              ? "image-upload-area dragover"
              : "image-upload-area"
          }
          id={"project-image-upload-" + projectId}
          onDrop={(event) => {
            event.preventDefault();
            setIsProjectImageDrag(true);
            const files = event.dataTransfer.files;
            if (files.length > 0) {
              handleFileSelect(files[0], (dataUrl: string) =>
                setProjectImageUrl(dataUrl)
              );
            }
          }}
          onDragLeave={() => {
            setIsProjectImageDrag(false);
          }}
          onDragEnter={() => {
            setIsProjectImageDrag(true);
          }}
        >
          <input
            type="file"
            id={"project-image-" + projectId}
            accept="image/"
            ref={projectImageInputRef}
            onChange={(event) => {
              const files = event.currentTarget.files;
              if (files && files.length > 0) {
                handleFileSelect(files[0], (dataUrl: string) =>
                  setProjectImageUrl(dataUrl)
                );
              }
            }}
          />
          <div className="upload-content">
            <p>クリックまたはドラッグして画像をアップロード</p>
            <p className="upload-text">JPG, PNG, GIF対応</p>
          </div>
        </div>
        <div
          id={"project-image-preview-" + projectId}
          style={{
            display: project.image || projectImageUrl ? "block" : "none",
          }}
        >
          {(projectImageUrl || project.image) && (
            <Image
              id={"project-image-preview-img-" + projectId}
              width={300}
              height={300}
              className="image-preview"
              src={projectImageUrl ? projectImageUrl : project.image}
              alt={path.basename(
                projectImageUrl ? projectImageUrl : project.image
              )}
            />
          )}
        </div>
      </div>
      <div className="form-group">
        <label>使用技術</label>
        <div className="tech-tags" id={"tech-tags-" + projectId}>
          {project.tech.map((tech, techIndex) => (
            <span className="tech-tag" key={techIndex}>
              {tech}
              <span
                className="remove-tag"
                onClick={() => removeTechTag(projectId, techIndex)}
              >
                x
              </span>
            </span>
          ))}
        </div>
        <div className="add-tag-input">
          <input
            ref={inputTechTagRef}
            type="text"
            id={"tech-input-" + projectId}
            placeholder="技術名を入力"
            onKeyDown={(event) => handleKeyEvent(event, projectId)}
          />
          <button onClick={() => addTechTag(projectId)}>追加</button>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>デモURL</label>
          <input
            type="url"
            value={project.liveDemo}
            onChange={(event) => {
              updateProject(event, projectId, "liveDemo");
            }}
          />
        </div>
        <div className="form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            value={project.github}
            onChange={(event) => {
              updateProject(event, projectId, "github");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectComponent;
