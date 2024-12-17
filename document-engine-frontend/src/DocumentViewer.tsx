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
  const instanceRef = useRef<any>(null); // Store the PSPDFKit instance

  useEffect(() => {
    const loadDocument = async () => {
      try {
        console.log('Fetching document:', documentId);
        const response = await fetch(`http://localhost:3000/api/documents/${documentId}/view`);
        
        if (!response.ok) {
          throw new Error('Failed to load document configuration');
        }
        
        const data = await response.json();
        console.log('Received config:', data);
        setViewerConfig(data);
      } catch (err) {
        console.error('Error loading document:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    if (documentId) {
      loadDocument();
    }
  }, [documentId]);

  useEffect(() => {
    if (viewerConfig && containerRef.current && window.PSPDFKit) {
      console.log('Initializing viewer with config:', viewerConfig);
      
      window.PSPDFKit.load({
        serverUrl: 'http://localhost:5000/',
        container: containerRef.current,
        documentId: viewerConfig.documentId,
        authPayload: { jwt: viewerConfig.jwt },
        instant: true
      })
      .then((instance) => {
        instanceRef.current = instance;
      })
      .catch((err: Error) => {
        console.error('PSPDFKit error:', err);
        setError(`Failed to load PDF viewer: ${err.message}`);
      });

      // Cleanup function
      return () => {
        if (instanceRef.current) {
          instanceRef.current.dispose();
          instanceRef.current = null;
        }
      };
    }
  }, [viewerConfig]);

  // Additional cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (instanceRef.current) {
        instanceRef.current.dispose();
        instanceRef.current = null;
      }
    };
  }, []);

  if (error) return <div className="error">Error: {error}</div>;
  if (!viewerConfig) return <div>Loading...</div>;

  return (
    <div className="document-viewer">
      <h1>Document Viewer</h1>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}