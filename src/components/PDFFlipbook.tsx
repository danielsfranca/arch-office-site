"use client";

import { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PDFViewerProps {
    file: string;
    onClose: () => void;
}

// Custom Page Component required for forwardRef usage with HTMLFlipBook
const PDFPage = forwardRef<HTMLDivElement, { pageNumber: number, width: number, height: number }>(({ pageNumber, width, height }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                backgroundColor: 'white',
                width: `${width}px`,
                height: `${height}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
            className="pdf-page-leaf"
        >
            <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                width={width}
                devicePixelRatio={4.5} // High resolution (300+ DPI equivalent)
                loading={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: width, height: height }}>
                        <div style={{ width: '32px', height: '32px', border: '2px dotted #ccc', borderTopColor: '#000', borderRadius: '50%' }} className="animate-spin" />
                    </div>
                }
            />
        </div>
    );
});

PDFPage.displayName = "PDFPage";

export default function PDFFlipbook({ file, onClose }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [dimensions, setDimensions] = useState<{ width: number, height: number } | null>(null);
    const bookRef = useRef<any>(null);
    const [loading, setLoading] = useState(true);

    // Zoom State
    const [zoom, setZoom] = useState(1);
    const zoomStep = 0.2;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle Fullscreen
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    // Track fullscreen changes (e.g. Esc key)
    useEffect(() => {
        const handleFsChange = () => {
            const isFs = !!document.fullscreenElement;
            setIsFullscreen(isFs);
            if (isFs) setShowHeader(false); // Hide by default in FS
            else setShowHeader(true);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Load PDF metadata and first page to get dimensions
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    // Get dimensions from the first page to ensure the book matches the PDF exactly
    const onPageLoadSuccess = (page: any) => {
        const viewport = page.getViewport({ scale: 1 });
        // targetWidth is now for a SINGLE page (leaf)
        const targetWidth = 550;
        const scaleFactor = targetWidth / viewport.width;
        const pageHeight = viewport.height * scaleFactor;

        setDimensions({
            width: targetWidth,
            height: pageHeight
        });

        // Set initial zoom to exactly 195%
        setZoom(1.95);

        setLoading(false);
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!bookRef.current) return;
            if (e.key === "ArrowRight") bookRef.current.pageFlip().flipNext();
            if (e.key === "ArrowLeft") bookRef.current.pageFlip().flipPrev();
            if (e.key === "Escape") {
                if (document.fullscreenElement) document.exitFullscreen();
                else onClose();
            }

            if (e.key === "+" || e.key === "=") setZoom(z => Math.min(z + zoomStep, 3));
            if (e.key === "-") setZoom(z => Math.max(z - zoomStep, 0.5));
            if (e.key === "0") setZoom(1);
            if (e.key === "f") toggleFullscreen();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dimensions, toggleFullscreen, onClose]);

    return (
        <div
            ref={containerRef}
            onMouseMove={(e) => {
                // Show header if mouse is in top 100px
                if (e.clientY < 100) setShowHeader(true);
                else if (isFullscreen) setShowHeader(false);
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                backgroundColor: '#000', // Solid black for better contrast and performance
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >

            {/* Header Controls */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 2050, // Above everything
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
                    pointerEvents: 'auto',
                    opacity: showHeader ? 1 : 0,
                    transform: showHeader ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="controls-header"
            >
                <div style={{ color: 'white', fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.15em', opacity: 0.6 }}>
                    PORTFÓLIO 2026
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '100px',
                    padding: '0.4rem 1.2rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <button onClick={() => setZoom(z => Math.max(z - zoomStep, 0.5))} style={{ color: 'white', opacity: 0.6, cursor: 'pointer', background: 'none', border: 'none', display: 'flex' }}>
                        <ZoomOut size={18} />
                    </button>
                    <span style={{ color: 'white', fontSize: '0.75rem', width: '2.5rem', textAlign: 'center', fontWeight: 400 }}>{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(z => Math.min(z + zoomStep, 3))} style={{ color: 'white', opacity: 0.6, cursor: 'pointer', background: 'none', border: 'none', display: 'flex' }}>
                        <ZoomIn size={18} />
                    </button>

                    <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

                    <button onClick={toggleFullscreen} style={{ color: 'white', opacity: 0.6, cursor: 'pointer', background: 'none', border: 'none', display: 'flex' }}>
                        {isFullscreen ? <X size={20} /> : <ZoomIn size={18} style={{ transform: 'rotate(45deg)' }} />}
                    </button>

                    <button onClick={onClose} style={{ color: 'white', opacity: 0.6, cursor: 'pointer', background: 'none', border: 'none', display: 'flex' }}>
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    overflow: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 2rem'
                }}
                className="no-scrollbar"
            >
                {/* Fixed Nav Buttons */}
                <button
                    onClick={() => bookRef.current?.pageFlip().flipPrev()}
                    style={{
                        position: 'fixed',
                        left: '2rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 100,
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                >
                    <ChevronLeft size={80} strokeWidth={0.5} />
                </button>

                {/* Scalable Book Container */}
                <div
                    style={{
                        transform: `scale(${zoom})`,
                        transition: 'transform 0.2s ease-out',
                        transformOrigin: 'center center',
                        boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
                    }}
                >
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={null} // Handled by inner state
                    >
                        {/* Always render first page invisible to get dimensions if not ready */}
                        <div style={{ display: 'none' }}>
                            <Page
                                pageNumber={1}
                                onLoadSuccess={onPageLoadSuccess}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>

                        {dimensions && numPages > 0 && (
                            <HTMLFlipBook
                                width={dimensions.width}
                                height={dimensions.height}
                                size="fixed"
                                minWidth={200}
                                maxWidth={1000}
                                minHeight={300}
                                maxHeight={1400}
                                maxShadowOpacity={0.4}
                                showCover={true} // First page is cover
                                mobileScrollSupport={true}
                                ref={bookRef}
                                className=""
                                style={{ backgroundColor: "transparent" }}
                                startPage={0}
                                drawShadow={true}
                                flippingTime={800}
                                usePortrait={false} // Ensure double pages
                                startZIndex={0}
                                autoSize={false}
                                clickEventForward={true}
                                useMouseEvents={true}
                                swipeDistance={30}
                                showPageCorners={false}
                                disableFlipByClick={false}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <PDFPage
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={dimensions.width}
                                        height={dimensions.height}
                                    />
                                ))}
                            </HTMLFlipBook>
                        )}

                        {loading && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%' }} className="animate-spin" />
                                <span style={{ color: 'white', opacity: 0.4, fontSize: '0.75rem', letterSpacing: '0.3em' }}>PREPARANDO PORTFÓLIO</span>
                            </div>
                        )}
                    </Document>
                </div>

                <button
                    onClick={() => bookRef.current?.pageFlip().flipNext()}
                    style={{
                        position: 'fixed',
                        right: '2rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 100,
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                >
                    <ChevronRight size={80} strokeWidth={0.5} />
                </button>
            </div>

            {/* Bottom Hint */}
            <div style={{ position: 'absolute', bottom: '2rem', color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', pointerEvents: 'none' }}>
                Arraste os cantos ou use as setas
            </div>
        </div>
    );
}
