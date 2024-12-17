// src/types/global.d.ts
interface Window {
    PSPDFKit: {
      load: (config: {
        serverUrl: string;
        container: HTMLElement;
        documentId: string;
        authPayload: { jwt: string };
        instant: boolean;
      }) => Promise<any>;
      unload: (container: HTMLElement) => Promise<void>;
    }
  }

  interface PSPDFKitConfig {
    serverUrl: string;
    container: HTMLElement;
    documentId: string;
    authPayload: { jwt: string };
    instant: boolean;
  }
  
  interface PSPDFKitType {
    load: (config: PSPDFKitConfig) => Promise<any>;
  }