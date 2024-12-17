import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type DocumentView = {
  documentId: string;
  jwt: string;
};

export function DocumentViewer() {
  const { documentId } = useParams<{ documentId: string }>();
  const [viewerConfig, setViewerConfig] = useState<DocumentView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        console.log('🔍 Fetching document:', documentId);
        const response = await fetch(`http://localhost:3000/api/documents/${documentId}/view`);
        
        if (!response.ok) {
          throw new Error('Failed to load document configuration');
        }
        
        const data = await response.json();
        console.log('📄 API Response:', data);
        setViewerConfig(data);
      } catch (err) {
        console.error('❌ Error loading document:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    if (documentId) {
      loadDocument();
    }
  }, [documentId]);

  useEffect(() => {
    const initViewer = async () => {
      if (!viewerConfig || !containerRef.current || !window.PSPDFKit) {
        console.log('⏳ Waiting for:', {
          viewerConfig: !!viewerConfig,
          container: !!containerRef.current,
          PSPDFKit: !!window.PSPDFKit
        });
        return;
      }

      console.log('🚀 Initializing viewer with:', {
        serverUrl: 'http://localhost:5000/',
        documentId: viewerConfig.documentId,
        jwt: viewerConfig.jwt
      });
      
      try {
        const instance = await window.PSPDFKit.load({
          serverUrl: 'http://localhost:5000/',
          container: containerRef.current,
          documentId: viewerConfig.documentId,
          authPayload: { jwt: viewerConfig.jwt },
          instant: true
        });
        console.log('✅ PSPDFKit instance created:', instance);
      } catch (err) {
        console.error('❌ PSPDFKit error:', err);
        setError(`Failed to load PDF viewer: ${err}`);
      }
    };

    initViewer();
  }, [viewerConfig]);

  if (error) return <div className="error">Error: {error}</div>;
  if (!viewerConfig) return <div>Loading...</div>;

  return (
    <div className="document-viewer">
      <h1>Document Viewer</h1>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100vh',
          border: '1px solid #ccc' // Added to visualize the container
        }} 
      />
    </div>
  );
}