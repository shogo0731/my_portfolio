"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import {
  about,
  skills,
  projects,
  About,
  Skills,
  Projects,
} from "@/app/const";
import "./admin.css";
import ProjectComponent from "./components/projectComponent";

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

const Admin = () => {
  useEffect(() => {
    const checkSession = async () => {
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      if (!session?.user) {
        signIn("google");
      }
    };
    checkSession();
  }, []);
  const [aboutState, setAboutState] = useState<About>(about);
  const [skillsState, setSkillsState] = useState<Skills>(skills);
  const [projectsState, setProjectsState] = useState<Projects>(projects);
  const [isPreviewDisplay, setIsPreviewDisplay] = useState<boolean>(false);
  const [isAboutImageDrag, setIsAboutImageDrag] = useState<boolean>(false);
  const [aboutImageUrl, setAboutImageUrl] = useState<string>("");

  const aboutImageInputRef = useRef<HTMLInputElement>(null);

  // 初期化
  // function init() {
  //   renderProjects();
  //   setupImageUpload();
  // }

  // 画像アップロード設定
  // function setupImageUpload() {
  //   // 自己紹介画像のアップロード
  //   setupImageUploadForElement(
  //     "about-image",
  //     "about-image-upload",
  //     "about-image-preview",
  //     "about-image-preview-img",
  //     (dataUrl) => {
  //       aboutData.image = dataUrl;
  //     }
  //   );
  // }

  // 画像アップロード設定関数
  // function setupImageUploadForElement(
  //   inputId,
  //   uploadAreaId,
  //   previewId,
  //   previewImgId,
  //   callback
  // ) {
  //   const input = document.getElementById(inputId);
  //   const uploadArea = document.getElementById(uploadAreaId);
  //   const preview = document.getElementById(previewId);
  //   const previewImg = document.getElementById(previewImgId);

  //   // クリックでファイル選択
  //   uploadArea.addEventListener("click", () => {
  //     input.click();
  //   });

  //   // ファイル選択時
  //   input.addEventListener("change", (e) => {
  //     handleFileSelect(e.target.files[0], preview, previewImg, callback);
  //   });

  //   /* ドラッグアンドドロップ */

  //   //dragover イベントは、要素または選択されたテキストが、
  //   // 妥当なドロップターゲットの上にあるときに（数百ミリ秒間隔で）発生します。
  //   uploadArea.addEventListener("dragover", (e) => {
  //     e.preventDefault();
  //     uploadArea.classNameList.add("dragover");
  //   });

  //   //dragleave イベントは、ドラッグしている要素や選択中のテキストが
  //   // 妥当なドロップターゲットを離れたときに発生します。
  //   uploadArea.addEventListener("dragleave", () => {
  //     uploadArea.classNameList.remove("dragover");
  //   });

  //   uploadArea.addEventListener("drop", (e) => {
  //     e.preventDefault();
  //     uploadArea.classNameList.remove("dragover");
  //     const files = e.dataTransfer.files;
  //     if (files.length > 0) {
  //       handleFileSelect(files[0], preview, previewImg, callback);
  //     }
  //   });
  // }

  function addSkill() {
    const newSkill = {
      title: "新しいスキル",
      description: "スキルの説明を入力してください",
      icon: "⭐",
    };
    setSkillsState((prevState) => [...prevState, newSkill]);
  }

  //スキルの更新
  function updateSkill(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: "title" | "description" | "icon"
  ) {
    const newSkillsState = skillsState.map((skill) => {
      if (skillsState[index] == skill) {
        return {
          ...skill,
          [field]: event.target.value,
        };
      }
      return skill;
    });
    setSkillsState(newSkillsState);
  }

  // スキルの削除
  function removeSkill(index: number) {
    if (confirm("このスキルを削除しますか？")) {
      const updateSkillsState = skillsState.filter(
        (skill) => skillsState[index] !== skill
      );
      setSkillsState(updateSkillsState);
    }
  }

  // プロジェクトの描画
  // function renderProjects() {
  //   const container = document.getElementById("projects-container");
  //   container.innerHTML = "";

  //   projectsData.forEach((project) => {
  //     const projectCard = document.createElement("div");
  //     projectCard.classNameName = "item-card";
  //     projectCard.innerHTML = `
  //                   <div className="item-header">
  //                       <div className="item-title">プロジェクト #${project.id}</div>
  //                       <button className="btn btn-danger" onclick="removeProject(${project.id})">削除</button>
  //                   </div>
  //                   <div className="form-group">
  //                       <label>タイトル</label>
  //                       <input type="text" value="${project.title}" onchange="updateProject(${project.id}, 'title', this.value)">
  //                   </div>
  //                   <div className="form-group">
  //                       <label>説明</label>
  //                       <textarea onchange="updateProject(${project.id}, 'description', this.value)">${project.description}</textarea>
  //                   </div>
  //                   <div className="form-group">
  //                       <label>プロジェクト画像</label>
  //                       <div className="image-upload-area" id="project-image-upload-${project.id}">
  //                           <input type="file" id="project-image-${project.id}" accept="image/">
  //                           <div className="upload-content">
  //                               <p>📷 クリックまたはドラッグして画像をアップロード</p>
  //                               <p className="upload-text">JPG, PNG, GIF対応</p>
  //                           </div>
  //                       </div>
  //                       <div id="project-image-preview-${project.id}" style="display: ${project.image ? "block" : "none"};">
  //                           <img id="project-image-preview-img-${project.id}" className="image-preview" src="${project.image || ""}">
  //                       </div>
  //                   </div>
  //                   <div className="form-group">
  //                       <label>使用技術</label>
  //                       <div className="tech-tags" id="tech-tags-${project.id}">
  //                           ${project.tech.map((tech) => `<span className="tech-tag">${tech}<span className="remove-tag" onclick="removeTechTag(${project.id}, '${tech}')">×</span></span>`).join("")}
  //                       </div>
  //                       <div className="add-tag-input">
  //                           <input type="text" id="tech-input-${project.id}" placeholder="技術名を入力">
  //                           <button onclick="addTechTag(${project.id})">追加</button>
  //                       </div>
  //                   </div>
  //                   <div className="form-row">
  //                       <div className="form-group">
  //                           <label>デモURL</label>
  //                           <input type="url" value="${project.liveDemo}" onchange="updateProject(${project.id}, 'liveDemo', this.value)">
  //                       </div>
  //                       <div className="form-group">
  //                           <label>GitHub URL</label>
  //                           <input type="url" value="${project.github}" onchange="updateProject(${project.id}, 'github', this.value)">
  //                       </div>
  //                   </div>
  //               `;
  //     container.appendChild(projectCard);

  //     // 画像アップロード設定
  //     setupImageUploadForElement(
  //       `project-image-${project.id}`,
  //       `project-image-upload-${project.id}`,
  //       `project-image-preview-${project.id}`,
  //       `project-image-preview-img-${project.id}`,
  //       (dataUrl) => {
  //         updateProject(project.id, "image", dataUrl);
  //       }
  //     );
  //   });
  // }

  // プロジェクトの追加
  function addProject() {
    const newProject = {
      title: "新しいプロジェクト",
      description: "プロジェクトの説明を入力してください",
      image: "",
      tech: [],
      liveDemo: "",
      github: "",
    };
    setProjectsState((prevState) => [...prevState, newProject]);
  }

  // 全データの保存
  function saveAll() {
    // 現在の入力値を更新
    aboutData.title = document.getElementById("about-title").value;
    aboutData.text = document.getElementById("about-text").value;

    // 保存処理（実際の実装では、サーバーにデータを送信）
    const saveData = {
      about: aboutData,
      skills: skillsData,
      projects: projectsData,
      timestamp: new Date().toISOString(),
    };

    // LocalStorageに保存（デモ用）
    try {
      localStorage.setItem("portfolioData", JSON.stringify(saveData));

      // 成功メッセージの表示
      showSuccessMessage("すべてのデータが正常に保存されました！");

      // 実際の実装では、ここでサーバーにデータを送信
      // fetch('/api/save-portfolio', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(saveData)
      // });
    } catch (error) {
      console.error("保存エラー:", error);
      showErrorMessage(
        "保存中にエラーが発生しました。もう一度お試しください。"
      );
    }
  }

  // 成功メッセージの表示
  function showSuccessMessage(message) {
    const saveSection = document.querySelector(".save-section");
    const existingMessage = saveSection.querySelector(".success-message");

    if (existingMessage) {
      existingMessage.remove();
    }

    const successDiv = document.createElement("div");
    successDiv.classNameName = "success-message";
    successDiv.textContent = message;

    saveSection.insertBefore(successDiv, saveSection.firstChild);

    // 3秒後にメッセージを削除
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  // エラーメッセージの表示
  function showErrorMessage(message) {
    const saveSection = document.querySelector(".save-section");
    const existingMessage = saveSection.querySelector(".error-message");

    if (existingMessage) {
      existingMessage.remove();
    }

    const errorDiv = document.createElement("div");
    errorDiv.classNameName = "error-message";
    errorDiv.style.cssText =
      "background: #ef4444; color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;";
    errorDiv.textContent = message;

    saveSection.insertBefore(errorDiv, saveSection.firstChild);

    // 5秒後にメッセージを削除
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  // 保存されたデータの読み込み
  // function loadSavedData() {
  //   try {
  //     const savedData = localStorage.getItem("portfolioData");
  //     if (savedData) {
  //       const data = JSON.parse(savedData);

  //       // データが存在する場合は復元
  //       if (data.about) {
  //         aboutData = data.about;
  //       }
  //       if (data.skills) {
  //         skillsData = data.skills;
  //         nextSkillId = Math.max(...skillsData.map((s) => s.id)) + 1;
  //       }
  //       if (data.projects) {
  //         projectsData = data.projects;
  //         nextProjectId = Math.max(...projectsData.map((p) => p.id)) + 1;
  //       }

  //       console.log("保存されたデータを読み込みました");
  //     }
  //   } catch (error) {
  //     console.error("データ読み込みエラー:", error);
  //   }
  // }

  // ページ離脱時の確認
  // window.addEventListener("beforeunload", (e) => {
  //   const currentData = {
  //     about: {
  //       title: document.getElementById("about-title").value,
  //       text: document.getElementById("about-text").value,
  //       image: aboutData.image,
  //     },
  //     skills: skillsData,
  //     projects: projectsData,
  //   };

  //   const savedData = localStorage.getItem("portfolioData");
  //   if (savedData) {
  //     const saved = JSON.parse(savedData);
  //     if (
  //       JSON.stringify(currentData) !==
  //       JSON.stringify({
  //         about: saved.about,
  //         skills: saved.skills,
  //         projects: saved.projects,
  //       })
  //     ) {
  //       e.preventDefault();
  //       e.returnValue = "変更が保存されていません。このページを離れますか？";
  //     }
  //   }
  // });

  return (
    <SessionProvider>
      <AuthGuard>
        <div className="container">
          <div className="header">
            <h1>ポートフォリオ管理者ページ</h1>
            <p>サイトの内容を編集・管理できます</p>
          </div>

          <div className="admin-section">
            <h2 className="section-title">自己紹介</h2>
            <div className="form-group">
              <label htmlFor="about-text">自己紹介文</label>
              <textarea
                id="about-text"
                defaultValue={about.description}
              ></textarea>
            </div>
            <div className="form-group">
              <label>プロフィール画像</label>
              <div
                className={
                  isAboutImageDrag
                    ? "image-upload-area dragover"
                    : "image-upload-area"
                }
                id="about-image-upload"
                onDrop={(event) => {
                  event.preventDefault();
                  setIsAboutImageDrag(false);
                  const files = event.dataTransfer.files;
                  if (files.length > 0) {
                    handleFileSelect(files[0], (dataUrl) => {
                      setAboutImageUrl(dataUrl);
                    });
                  }
                }}
                onDragLeave={() => {
                  setIsAboutImageDrag(false);
                }}
                onDragEnter={() => {
                  setIsAboutImageDrag(true);
                }}
              >
                <input
                  type="file"
                  id="about-image"
                  accept="image/*"
                  ref={aboutImageInputRef}
                  onChange={(event) => {
                    const files = event.currentTarget.files;
                    if (files && files.length > 0) {
                      handleFileSelect(files[0], (dataUrl) => {
                        setAboutImageUrl(dataUrl);
                      });
                    }
                  }}
                />
                <div className="upload-content">
                  <p>クリックまたはドラッグして画像をアップロード</p>
                  <p className="upload-text">JPG, PNG, GIF対応</p>
                </div>
              </div>
              <div
                id="about-image-preview"
                style={{
                  display: aboutImageUrl || aboutState.image ? "block" : "none",
                }}
              >
                {
                  // aboutImageUrlかaboutState.imageがある場合、プロフィール画像を表示
                  // 画像表示優先度は変更後の画像の方が高い
                  (aboutImageUrl || aboutState.image) && (
                    <Image
                      src={aboutImageUrl ? aboutImageUrl : aboutState.image}
                      alt="profile image"
                      id="about-image-preview-img"
                      className="image-preview"
                      width={300}
                      height={300}
                    />
                  )
                }
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h2 className="section-title">スキル</h2>
            <div id="skills-container">
              {skillsState.map((skill, index) => {
                return (
                  <div key={index}>
                    <div className="item-header">
                      <div className="item-title">スキル #{index}</div>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeSkill(index);
                        }}
                      >
                        削除
                      </button>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>アイコン</label>
                        <input
                          type="text"
                          value={skill.icon}
                          onChange={(event) =>
                            updateSkill(event, index, "icon")
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>タイトル</label>
                        <input
                          type="text"
                          value={skill.title}
                          onChange={(event) =>
                            updateSkill(event, index, "title")
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>説明</label>
                      <textarea
                        onChange={(event) =>
                          updateSkill(event, index, "description")
                        }
                        value={skill.description}
                      ></textarea>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                addSkill();
              }}
            >
              スキルを追加
            </button>
          </div>

          <div className="admin-section">
            <h2 className="section-title">プロジェクト</h2>
            <div id="projects-container">
              {projectsState.map((project, index) => {
                return (
                  <ProjectComponent
                    key={index}
                    projectId={index}
                    project={project}
                    projectsState={projectsState}
                    setProjectsState={setProjectsState}
                  />
                );
              })}
            </div>
            <button className="btn btn-secondary" onClick={addProject}>
              プロジェクトを追加
            </button>
          </div>

          <div className="preview-section">
            <div className="preview-header">
              <h2>プレビュー</h2>
              <button
                className="btn btn-primary"
                onClick={() => setIsPreviewDisplay(true)}
              >
                プレビューを更新
              </button>
            </div>
            <div id="preview-content" className="preview-content">
              {isPreviewDisplay ? (
                <div>
                  {/* 自己紹介 */}
                  <div className="preview-page">
                    <div className="preview-section-content">
                      <h2>About Me</h2>
                      <div className="preview-about-content">
                        <div className="preview-about-text">
                          <p>{aboutState.description}</p>
                        </div>
                        <div className="preview-about-image">
                          {/* {aboutState.image ? (
                            <Image
                              src={aboutState.image}
                              alt="Profile"
                              height={300}
                              width={300}
                            />
                          ) : (
                            <p>プロフィール画像</p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* スキル */}
                  <div className="preview-page">
                    <div className="preview-section-content">
                      <h2>Skills</h2>
                      <div className="preview-skills-grid">
                        {skillsState.map((skill, index) => (
                          <div key={index} className="preview-skill-card">
                            <div className="preview-skill-icon">
                              {skill.icon}
                            </div>
                            <h3>{skill.title}</h3>
                            <p>{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* プロジェクト　*/}
                  <div className="preview-page">
                    <div className="preview-section-content">
                      <h2>Projects</h2>
                      <div className="preview-projects-grid">
                        {projectsState.map((project, index) => (
                          <div key={index} className="preview-project-card">
                            <div className="preview-project-image">
                              {project.image && (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  height={300}
                                  width={300}
                                />
                              )}
                            </div>
                            <div className="preview-project-content">
                              <h3 className="preview-project-title">
                                {project.title}
                              </h3>
                              <p className="preview-project-description">
                                {project.description}
                              </p>
                              <div className="preview-project-tech">
                                {project.tech.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="preview-tech-tag"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="preview-project-links">
                                {project.liveDemo && (
                                  <a
                                    href={project.liveDemo}
                                    className="preview-project-link"
                                    target="_blank"
                                  >
                                    Live Demo
                                  </a>
                                )}
                                {project.github && (
                                  <a
                                    href={project.github}
                                    className="preview-project-link"
                                    target="_blank"
                                  >
                                    GitHub
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="preview-page">
                  <p
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#666",
                    }}
                  >
                    「プレビューを更新」ボタンをクリックして、現在の設定でのプレビューを表示します。
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="save-section">
            <h2>すべての変更を保存</h2>
            <p style={{ marginBottom: "1rem", color: "#666" }}>
              上記の変更内容をすべて保存します
            </p>
            <button className="save-btn" onClick={saveAll}>
              💾 すべて保存
            </button>
          </div>
        </div>
      </AuthGuard>
    </SessionProvider>
  );
};

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (!session?.user) {
    return <div>ログインが必要です。</div>;
  }

  return <>{children}</>;
}

export default Admin;
