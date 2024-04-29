import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Loader } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface SlideViewerProps {
  file: any;
  scrollToPage?: any,
  currentPage?: any
}

const SlideViewer: React.FC<SlideViewerProps> = ({file, currentPage }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pagesRendered, setPagesRendered] = useState<number>(1); // Start with one page rendered
  const [currentScroll, setCurrentScroll] = useState<number>(0); // Track scroll position

  const documentRef = useRef<any>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setCurrentScroll(documentRef.current?.scrollTop || 0);
  //   };

  //   documentRef.current?.container?.addEventListener("scroll", handleScroll);

  //   return () => {
  //     documentRef.current?.container?.removeEventListener(
  //       "scroll",
  //       handleScroll
  //     );
  //   };
  // }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleScrollToPage(pageNumber: number): void {
    // Get the height of each page
    const pageHeight = documentRef.current?.container?.querySelector(`div[data-page-number="${pageNumber}"]`)?.clientHeight || 0;
    
    // Calculate the scroll position to reach the desired page
    const scrollTo = pageHeight * (pageNumber - 1);
  
    // Scroll the container to the desired position
    documentRef.current?.container?.scrollTo({ top: scrollTo, behavior: 'smooth' });
  }
  

  return (
    <div className="flex flex-col space-y-1 h-full p-5 w-1/2">
      <div className="font-semibold">{file.name}</div>
      <div className="overflow-y-auto">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Loader/>}
          ref={documentRef}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
            key={index + 1}
            pageNumber={index + 1}
            inputRef={(ref) => {
              if (ref && currentPage === index + 1) {
                ref.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={"my-3 shadow-xl"}
          />
          
          ))}
        </Document>
      </div>
    </div>
  );
};

export default SlideViewer;
