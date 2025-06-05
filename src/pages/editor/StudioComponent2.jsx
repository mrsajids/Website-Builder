// src/GrapesEditor.js
import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import presetWebpage from 'grapesjs-preset-webpage';
import pluginForms from 'grapesjs-plugin-forms';
// import pluginNavbar from 'grapesjs-navbar';
import pluginBasicBlocks from 'grapesjs-blocks-basic';
const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = grapesjs.init({
        container: '#editor',
        height: '100vh',
        fromElement: true,
        storageManager: false,
        plugins: [presetWebpage,pluginForms ,pluginBasicBlocks],
        pluginsOpts: {
        },
      });
    }
  }, []);

  return <div id="editor"></div>;
};

export default GrapesEditor;
