'use client'
import React from 'react'
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { NextIcon, PreviousIcon, RenderSearchProps, searchPlugin } from '@react-pdf-viewer/search';



const DocumentViewer = () => {
  const url = 'https://corsproxy.io/?' + encodeURIComponent('http://www.pdf995.com/samples/pdf.pdf');
  const searchPluginInstance = searchPlugin();
  const { Search } = searchPluginInstance;
  const toolbarPluginInstance = toolbarPlugin({
    searchPlugin: {
        keyword: '',
        enableShortcuts: true
    },
    selectionModePlugin: {
        selectionMode: SelectionMode.Hand
    },
});


  const { Toolbar } = toolbarPluginInstance;


  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '720px',
        width: '570px'
    }}
>
      
      {/* <Toolbar /> */}
      <Viewer fileUrl={url} plugins={[toolbarPluginInstance]} />
      </div>
      </Worker>
    </div>
  )
}

export default DocumentViewer