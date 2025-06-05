import StudioEditor from "@grapesjs/studio-sdk/react";

import "@grapesjs/studio-sdk/style";

export default function Testing() {
  return (
    <StudioEditor
      options={{
        licenseKey: "DEMO_LOCALHOST_KEY",
        project: {
          type: "web",
          // TODO: replace with a unique id for your projects. e.g. an uuid
          id: "UNIQUE_PROJECT_ID",
        },
        identity: {
          // TODO: replace with a unique id for your end users. e.g. an uuid
          id: "UNIQUE_END_USER_ID",
        },
        assets: {
          storageType: "self",
          // Provide a custom upload handler for assets
          onUpload: async ({ files }) => {
            console.log("Uploading assets", files);

            const body = new FormData();
            //   Dummy upload: just simulate an API call and return a static image
            await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
            // For each uploaded file, return a dummy image asset
            return Array.from(files).map(() => ({
              src: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
            }));
            //   const response = await fetch('ASSETS_UPLOAD_URL', { method: 'POST', body });
            //   const result = await response.json();
            //   // The expected result should be an array of assets, eg.
            //   // [{ src: 'ASSET_URL' }]
            //   return result;
          },
          // Provide a custom handler for deleting assets
          onDelete: async ({ assets }) => {
            const body = JSON.stringify(assets);
            await fetch("ASSETS_DELETE_URL", { method: "DELETE", body });
          },
        },
        storage: {
          type: "self",
          // autosaveChanges: 100,
          // autosaveIntervalMs: 10000
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
          onLoad: async () =>{
            // console.log('reer');
            
            return  [
            {
              id: "template1",
              name: "Template 1",
              data: {
                pages: [
                  {
                    name: "Home",
                    component:
                    `<style>
    /* Global Styles */
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    h1, h2 {
      margin-top: 0;
    }

    /* Navbar */
    .navbar {
      background-color: #333;
      color: #fff;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
    }

    .navbar ul {
      list-style: none;
      display: flex;
      gap: 20px;
      margin: 0;
      padding: 0;
    }

    .navbar li {
      padding: 5px 10px;
    }

    .navbar li:hover {
      background-color: #555;
      border-radius: 5px;
    }

    /* Hero Section */
    .hero {
      background-image: url('https://via.placeholder.com/1600x500');
      background-size: cover;
      background-position: center;
      color: white;
      text-align: center;
      padding: 100px 20px;
    }

    .hero h1 {
      font-size: 3em;
      margin-bottom: 10px;
    }

    .hero p {
      font-size: 1.3em;
      max-width: 600px;
      margin: 0 auto;
    }

    /* About Section */
    .about {
      padding: 60px 30px;
      background-color: #fff;
      text-align: center;
    }

    .about p {
      max-width: 700px;
      margin: 20px auto;
      line-height: 1.6;
    }

    /* Services Section */
    .services {
      padding: 60px 30px;
      background-color: #e9e9e9;
      text-align: center;
    }

    .service-cards {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    .card {
      background-color: #fff;
      padding: 20px;
      width: 250px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
    }

    /* Footer */
    .footer {
      background-color: #222;
      color: #ccc;
      padding: 30px;
      text-align: center;
      font-size: 0.9em;
    }

    .footer a {
      color: #aaa;
    }

    .footer a:hover {
      color: white;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .service-cards {
        flex-direction: column;
        align-items: center;
      }

      .navbar {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar">
    <div class="logo"><strong>MyPortfolio</strong></div>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <h1>Hello, I'm John Doe</h1>
    <p>I'm a full-stack developer passionate about building beautiful and functional websites.</p>
  </section>

  <!-- About Section -->
  <section class="about">
    <h2>About Me</h2>
    <p>
      I am a software engineer with over 5 years of experience building scalable web applications.
      I specialize in Java Spring Boot, React, and responsive design. I love clean code, solving real-world
      problems, and working in cross-functional teams.
    </p>
  </section>

  <!-- Services Section -->
  <section class="services">
    <h2>What I Do</h2>
    <div class="service-cards">
      <div class="card">
        <h3>Web Development</h3>
        <p>Building responsive and optimized websites using modern web technologies.</p>
      </div>
      <div class="card">
        <h3>API Design</h3>
        <p>Designing scalable RESTful APIs with Java Spring Boot and Swagger integration.</p>
      </div>
      <div class="card">
        <h3>UI/UX Design</h3>
        <p>Creating user-friendly interfaces that provide a seamless user experience.</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>© 2025 John Doe | <a href="#">LinkedIn</a> | <a href="#">GitHub</a></p>
  </footer>`
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
          ]
          },
        },
      }}
    />
  );
}
