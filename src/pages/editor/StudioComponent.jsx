import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function StudioCemponent() {
  const location = useLocation();

  // useEffect(() => {
  //   if (location.state?.newproject) {
  //     setNewProject(newProject);
  //   }
  //   return () => {};
  // }, [location]);

  function addProjectToLocalStorage(newProject) {
    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

    const index = existingProjects.findIndex((p) => p.id === newProject.id);

    if (index !== -1) {
      // Optional: Update existing project
      existingProjects[index] = { ...existingProjects[index], ...newProject };
    } else {
      // Add new project
      existingProjects.push(newProject);
    }

    localStorage.setItem("projects", JSON.stringify(existingProjects));
  }

  const getNewProjectfromLocation = () => {
    if (location.state?.newproject) return location.state?.newproject;
    else return null;
  };

  // storing changes in session storage
  const saveToSessionStorage = async (projectId, project) => {
    const newprojectfromlocation = getNewProjectfromLocation();
    console.log(projectId, project);
    const obj = { ...newprojectfromlocation, ...project };
    // await waitAndFailRandomly("Testing when project save failed");
    sessionStorage.setItem(projectId, JSON.stringify(obj));
    addProjectToLocalStorage(obj);
  };

  function getProjectfromLocalStorageById(id) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (projects.length) return projects.find((project) => project.id === id);
  }
  // storing changes in session storage
  const loadFromSessionStorage = async (projectId) => {
    // await waitAndFailRandomly("Testing when project load failed");
    const projectString = sessionStorage.getItem(projectId);
    return projectString ? JSON.parse(projectString) : null;
  };

  // storing changes in session storage
  const waitAndFailRandomly = async (str) => {
    await new Promise((res) => setTimeout(res, 1000)); // fake delay
    // if (Math.random() >= 0.8) throw new Error(str);
  };

  //   storing file in sessionStorage in base64Data
  async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <StudioEditor
        options={{
          licenseKey:
            "4f82d568add6402ab787d6d94401072f4fe42dabce154baeb520bb702c161bf5",
          onDestroy: () => {
            sessionStorage.removeItem("DEMO_PROJECT_ID");
          },
          theme: "dark",
          project: {
            type: "web",
            default: {
              pages: [
                {
                  name: "Home",
                  component: "<h1>Start creating your application..</h1>",
                },
              ],
            },
          },
          assets: {
            storageType: "self",
            providerId: "picsum-pictures",
            providers: [
              {
                id: "picsum-pictures",
                label: "Lorem Picsum pictures",
                types: "image",
                onLoad: async (props) => {
                  console.log("Loading assets", props);
                  // Try to load assets from sessionStorage
                  const storedAssets = sessionStorage.getItem("uploadedAssets");
                  if (storedAssets) {
                    return JSON.parse(storedAssets);
                  }

                  // Fallback to Picsum images if nothing is in sessionStorage
                  return Array(30)
                    .fill(0)
                    .map((v, i) => ({
                      src: `https://picsum.photos/seed/${i + 1}/300/300.jpg`,
                      name: `Image #${i + 1}`,
                    }));
                },
              },
            ],
            // On upload: Convert image to base64 and save to sessionStorage
            onUpload: async ({ files, editor }) => {
              const newAssets = await Promise.all(
                Array.from(files).map(async (file) => {
                  // Convert the file to base64
                  const base64Data = await convertFileToBase64(file);
                  return {
                    src: base64Data, // Use the base64 string instead of the URL
                    name: file.name,
                  };
                })
              );

              // Get existing assets from sessionStorage
              const storedAssets =
                JSON.parse(sessionStorage.getItem("uploadedAssets")) || [];

              // Combine new assets with the existing ones
              const updatedAssets = [...storedAssets, ...newAssets];

              // Save updated assets to sessionStorage
              sessionStorage.setItem(
                "uploadedAssets",
                JSON.stringify(updatedAssets)
              );
              console.log(editor);

              editor.AssetManager.load({ reset: true });

              // Return the updated list of assets
              return updatedAssets;
            },

            // On delete: Remove deleted assets from sessionStorage
            onDelete: async ({ assets }) => {
              let storedAssets =
                JSON.parse(sessionStorage.getItem("uploadedAssets")) || [];

              // Filter out the assets to be deleted
              storedAssets = storedAssets.filter(
                (asset) =>
                  !assets.some((deletedAsset) => deletedAsset.src === asset.src)
              );

              // Save the updated assets back to sessionStorage
              sessionStorage.setItem(
                "uploadedAssets",
                JSON.stringify(storedAssets)
              );

              // Return the updated list of remaining assets
              return storedAssets;
            },

            // },
            // Provide a custom upload handler for assets
            //   onUpload: async ({ files }) => {
            //     // const body = new FormData();
            //     // for (const file of files) {
            //     //   body.append("files", file);
            //     // }
            //     // const response = await fetch("ASSETS_UPLOAD_URL", {
            //     //   method: "POST",
            //     //   body,
            //     // });
            //     // const result = await response.json();
            //     // // The expected result should be an array of assets, eg.
            //     // // [{ src: 'ASSET_URL' }]
            //     // return result;
            //   },
            //   // Provide a custom handler for deleting assets
            //   onDelete: async ({ assets }) => {
            //     // const body = JSON.stringify(assets);
            //     // await fetch("ASSETS_DELETE_URL", { method: "DELETE", body });
            //   },
          },
          storage: {
            type: "self",
            autosaveChanges: 5,
            // Provide a custom handler for saving the project data.
            onSave: async ({ project }) => {
              await saveToSessionStorage("DEMO_PROJECT_ID", project);
              console.log("Project saved", { project });
            },
            // Provide a custom handler for loading project data.
            onLoad: async (loadProps) => {
              console.log(loadProps.editor.getProjectData());

              // loading existing project
              const newprojectfromlocation = getNewProjectfromLocation();
              const project = getProjectfromLocalStorageById(
                newprojectfromlocation.id
              );
              // console.log("Project loaded", { project });
              if (project) {
                return {
                  project: project,
                };
              } else {
                let newproject = loadProps.editor.getProjectData();
                newproject.pages = [
                  {
                    name: "Home",
                    component: "<h1>Start creating your application..</h1>",
                  },
                ];

                await saveToSessionStorage("DEMO_PROJECT_ID", newproject);
                return {
                  project: newproject,
                };
              }

              // const project = await loadFromSessionStorage("DEMO_PROJECT_ID");

              // If the project doesn't exist (eg. first load), let's return a new one.
              return {
                project: project || {
                  pages: [{ name: "Home", component: "<h1>New project</h1>" }],
                },
              };
            },
            autosaveChanges: 1000,
            autosaveIntervalMs: 10000,
          },
          layout: {
            default: {
              type: "row",
              height: "100%",
              children: [
                {
                  type: "canvasSidebarTop",
                  sidebarTop: {
                    leftContainer: {
                      buttons: ({ items }) => [
                        ...items,
                        {
                          id: "openTemplatesButtonId",
                          size: "s",
                          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24.00 24.00" fill="none" stroke="#bd0000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.192"/><g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M14 17.5C14 16.0955 14 15.3933 14.3371 14.8889C14.483 14.6705 14.6705 14.483 14.8889 14.3371C15.3933 14 16.0955 14 17.5 14V14V14C18.9045 14 19.6067 14 20.1111 14.3371C20.3295 14.483 20.517 14.6705 20.6629 14.8889C21 15.3933 21 16.0955 21 17.5V17.5V17.5C21 18.9045 21 19.6067 20.6629 20.1111C20.517 20.3295 20.3295 20.517 20.1111 20.6629C19.6067 21 18.9045 21 17.5 21V21V21C16.0955 21 15.3933 21 14.8889 20.6629C14.6705 20.517 14.483 20.3295 14.3371 20.1111C14 19.6067 14 18.9045 14 17.5V17.5V17.5Z" fill="#ffffff"/> <path opacity="0.1" d="M3 17.5C3 16.0955 3 15.3933 3.33706 14.8889C3.48298 14.6705 3.67048 14.483 3.88886 14.3371C4.39331 14 5.09554 14 6.5 14V14V14C7.90446 14 8.60669 14 9.11114 14.3371C9.32952 14.483 9.51702 14.6705 9.66294 14.8889C10 15.3933 10 16.0955 10 17.5V17.5V17.5C10 18.9045 10 19.6067 9.66294 20.1111C9.51702 20.3295 9.32952 20.517 9.11114 20.6629C8.60669 21 7.90446 21 6.5 21V21V21C5.09554 21 4.39331 21 3.88886 20.6629C3.67048 20.517 3.48298 20.3295 3.33706 20.1111C3 19.6067 3 18.9045 3 17.5V17.5V17.5Z" fill="#ffffff"/> <path opacity="0.1" d="M3 6.5C3 5.09554 3 4.39331 3.33706 3.88886C3.48298 3.67048 3.67048 3.48298 3.88886 3.33706C4.39331 3 5.09554 3 6.5 3V3V3C7.90446 3 8.60669 3 9.11114 3.33706C9.32952 3.48298 9.51702 3.67048 9.66294 3.88886C10 4.39331 10 5.09554 10 6.5V6.5V6.5C10 7.90446 10 8.60669 9.66294 9.11114C9.51702 9.32952 9.32952 9.51702 9.11114 9.66294C8.60669 10 7.90446 10 6.5 10V10V10C5.09554 10 4.39331 10 3.88886 9.66294C3.67048 9.51702 3.48298 9.32952 3.33706 9.11114C3 8.60669 3 7.90446 3 6.5V6.5V6.5Z" fill="#ffffff"/> <path d="M14 17.5C14 16.0955 14 15.3933 14.3371 14.8889C14.483 14.6705 14.6705 14.483 14.8889 14.3371C15.3933 14 16.0955 14 17.5 14V14V14C18.9045 14 19.6067 14 20.1111 14.3371C20.3295 14.483 20.517 14.6705 20.6629 14.8889C21 15.3933 21 16.0955 21 17.5V17.5V17.5C21 18.9045 21 19.6067 20.6629 20.1111C20.517 20.3295 20.3295 20.517 20.1111 20.6629C19.6067 21 18.9045 21 17.5 21V21V21C16.0955 21 15.3933 21 14.8889 20.6629C14.6705 20.517 14.483 20.3295 14.3371 20.1111C14 19.6067 14 18.9045 14 17.5V17.5V17.5Z" stroke="#ffffff" stroke-width="2"/> <path d="M3 17.5C3 16.0955 3 15.3933 3.33706 14.8889C3.48298 14.6705 3.67048 14.483 3.88886 14.3371C4.39331 14 5.09554 14 6.5 14V14V14C7.90446 14 8.60669 14 9.11114 14.3371C9.32952 14.483 9.51702 14.6705 9.66294 14.8889C10 15.3933 10 16.0955 10 17.5V17.5V17.5C10 18.9045 10 19.6067 9.66294 20.1111C9.51702 20.3295 9.32952 20.517 9.11114 20.6629C8.60669 21 7.90446 21 6.5 21V21V21C5.09554 21 4.39331 21 3.88886 20.6629C3.67048 20.517 3.48298 20.3295 3.33706 20.1111C3 19.6067 3 18.9045 3 17.5V17.5V17.5Z" stroke="#ffffff" stroke-width="2"/> <path d="M3 6.5C3 5.09554 3 4.39331 3.33706 3.88886C3.48298 3.67048 3.67048 3.48298 3.88886 3.33706C4.39331 3 5.09554 3 6.5 3V3V3C7.90446 3 8.60669 3 9.11114 3.33706C9.32952 3.48298 9.51702 3.67048 9.66294 3.88886C10 4.39331 10 5.09554 10 6.5V6.5V6.5C10 7.90446 10 8.60669 9.66294 9.11114C9.51702 9.32952 9.32952 9.51702 9.11114 9.66294C8.60669 10 7.90446 10 6.5 10V10V10C5.09554 10 4.39331 10 3.88886 9.66294C3.67048 9.51702 3.48298 9.32952 3.33706 9.11114C3 8.60669 3 7.90446 3 6.5V6.5V6.5Z" stroke="#ffffff" stroke-width="2"/> <path d="M14 6.5H21" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.5 3V10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g></svg>`,
                          onClick: ({ editor }) => {
                            editor.runCommand("studio:layoutToggle", {
                              id: "my-templates-panel",
                              header: false,
                              placer: {
                                type: "dialog",
                                title: "Choose a template for your project",
                                size: "l",
                              },
                              layout: {
                                type: "panelTemplates",
                                content: { itemsPerRow: 3 },
                                onSelect: ({ loadTemplate, template }) => {
                                  // Load the selected template to the current project
                                  loadTemplate(template);
                                  // Close the dialog layout
                                  editor.runCommand("studio:layoutRemove", {
                                    id: "my-templates-panel",
                                  });
                                },
                              },
                            });
                          },
                        },
                      ],
                    },
                  },
                  grow: true,
                },
                { type: "sidebarRight" },
              ],
            },
          },
          templates: {
            // The onLoad can be an asyncronous function, so you can fetch templates from your API
            onLoad: async () => {
              // console.log('reer');
              return [
                {
                  id: "template1",
                  name: "Template 1",
                  data: {
                    pages: [
                      {
                        name: "Home",
                        component: `<h1 class="title">Template 1</h1>`,
                      },
                    ],
                  },
                },
                {
                  id: "template2",
                  name: "Template 2",
                  data: {
                    pages: [
                      {
                        component:
                          '<h1 class="title">Template 2</h1><style>.title { color: blue; font-size: 10rem; text-align: center }</style>',
                      },
                    ],
                  },
                },
              ];
            },
          },
          plugins: [
            (editor) =>
              editor.onReady(() => {
                // show template window when click on started with template
                // if (1) {
                //   editor.runCommand("studio:layoutToggle", {
                //     id: "my-templates-panel",
                //     header: false,
                //     placer: {
                //       type: "dialog",
                //       title: "Choose a template for your project",
                //       size: "l",
                //     },
                //     layout: {
                //       type: "panelTemplates",
                //       content: { itemsPerRow: 3 },
                //       onSelect: ({ loadTemplate, template }) => {
                //         loadTemplate(template);
                //         editor.runCommand("studio:layoutRemove", {
                //           id: "my-templates-panel",
                //         });
                //       },
                //     },
                //   });
                // }
              }),
          ],
        }}
      />
    </div>
  );
}
