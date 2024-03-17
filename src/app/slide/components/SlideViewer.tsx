import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdf from "../../pdf/8.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface SlideViewerProps {}

const SlideViewer: React.FC<SlideViewerProps> = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pagesRendered, setPagesRendered] = useState<number>(1); // Start with one page rendered
  const [currentScroll, setCurrentScroll] = useState<number>(0); // Track scroll position

  const documentRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScroll(documentRef.current?.scrollTop || 0);
    };

    documentRef.current?.container?.addEventListener("scroll", handleScroll);

    return () => {
      documentRef.current?.container?.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleScrollToPage(pageNumber: number): void {
    // Implementation for scrolling to a specific page
  }

  return (
    <div className="flex flex-col space-y-1 h-full p-5 w-1/2">
      <div className="font-semibold">Machinge Learning</div>
      <div className="overflow-y-auto">
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={"Please wait i am loading"}
          ref={documentRef}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index + 1}
              pageNumber={index + 1}
              className={"my-3 shadow-xl"}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default SlideViewer;
