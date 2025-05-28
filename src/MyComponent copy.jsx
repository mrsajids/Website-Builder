// ***************bakcup 16 may 2025
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function App() {
    // storing changes in session storage
  const saveToSessionStorage = async (projectId, project) => {
    await waitAndFailRandomly("Testing when project save failed");
    sessionStorage.setItem(projectId, JSON.stringify(project));
  };

  // storing changes in session storage
  const loadFromSessionStorage = async (projectId) => {
    await waitAndFailRandomly("Testing when project load failed");
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
    <StudioEditor
      options={{
        licenseKey:
          "4f82d568add6402ab787d6d94401072f4fe42dabce154baeb520bb702c161bf5",
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
          onUpload: async ({ files }) => {
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
          onLoad: async () => {
            const project = await loadFromSessionStorage("DEMO_PROJECT_ID");
            console.log("Project loaded", { project });

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
      }}
    />
  );
}
