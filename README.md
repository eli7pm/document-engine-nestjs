# Document Engine with NestJS and React

This project demonstrates how to integrate Document Engine with a NestJS backend and React frontend.

## Setup Prerequisites

### Document Engine Setup
For setting up Document Engine's Docker container and initial configuration, please follow steps 1-4 in the [Document Engine Getting Started Guide](https://www.nutrient.io/getting-started/document-engine/?use-case=viewer&http-client=curl&backend=nodejs).

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- A Document Engine license (for production use)
- OpenSSL for generating key pairs

## Generating JWT Key Pair

Before setting up the application, you need to generate your own RSA key pair for JWT authentication:

1. Generate the private key:
```bash
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
```

2. Extract the public key from the private key:
```bash
openssl rsa -pubout -in private.pem -out public.pem
```

## Project Structure

```
document-engine/
├── document-engine-backend/     # NestJS backend
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── main.ts
│   └── package.json
│
├── document-engine-frontend/    # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   └── DocumentViewer.tsx
│   ├── index.html
│   └── package.json
│
└── docker-compose.yml          # Document Engine setup
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/eli7pm/document-engine-nestjs.git
cd document-engine-nestjs
```

2. Create `docker-compose.yml`:
```yaml
version: "3.8"

services:
  document_engine:
    image: pspdfkit/document-engine:1.5.5
    environment:
      PGUSER: de-user
      PGPASSWORD: password
      PGDATABASE: document-engine
      PGHOST: db
      PGPORT: 5432
      API_AUTH_TOKEN: secret
      SECRET_KEY_BASE: secret-key-base
      JWT_PUBLIC_KEY: |
        -----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2gzhmJ9TDanEzWdP1WG+
        0Ecwbe7f3bv6e5UUpvcT5q68IQJKP47AQdBAnSlFVi4X9SaurbWoXdS6jpmPpk24
        QvitzLNFphHdwjFBelTAOa6taZrSusoFvrtK9x5xsW4zzt/bkpUraNx82Z8MwLwr
        t6HlY7dgO9+xBAabj4t1d2t+0HS8O/ed3CB6T2lj6S8AbLDSEFc9ScO6Uc1XJlSo
        rgyJJSPCpNhSq3AubEZ1wMS1iEtgAzTPRDsQv50qWIbn634HLWxTP/UH6YNJBwzt
        3O6q29kTtjXlMGXCvin37PyX4Jy1IiPFwJm45aWJGKSfVGMDojTJbuUtM+8P9Rrn
        AwIDAQAB
        -----END PUBLIC KEY-----
      JWT_ALGORITHM: RS256
      DASHBOARD_USERNAME: dashboard
      DASHBOARD_PASSWORD: secret
    ports:
      - 5000:5000
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: de-user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: document-engine
      POSTGRES_INITDB_ARGS: --data-checksums
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

⚠️ **Note:** The JWT keys shown above are Nutrient's example keys. Generate and use your own keys for production use.

3. Set up the backend:
```bash
cd document-engine-backend
npm install
```

4. Set up the frontend:
```bash
cd ../document-engine-frontend
npm install
```

## Configuration

### Backend Configuration

Create a `.env` file in the backend directory with your private key (example shown, replace with your own):

```env
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA2gzhmJ9TDanEzWdP1WG+0Ecwbe7f3bv6e5UUpvcT5q68IQJK
P47AQdBAnSlFVi4X9SaurbWoXdS6jpmPpk24QvitzLNFphHdwjFBelTAOa6taZrS
usoFvrtK9x5xsW4zzt/bkpUraNx82Z8MwLwrt6HlY7dgO9+xBAabj4t1d2t+0HS8
O/ed3CB6T2lj6S8AbLDSEFc9ScO6Uc1XJlSorgyJJSPCpNhSq3AubEZ1wMS1iEtg
AzTPRDsQv50qWIbn634HLWxTP/UH6YNJBwzt3O6q29kTtjXlMGXCvin37PyX4Jy1
IiPFwJm45aWJGKSfVGMDojTJbuUtM+8P9RrnAwIDAQABAoIBAQDSKxhGw0qKINhQ
IwQP5+bDWdqUG2orjsQf2dHOHNhRwJoUNuDZ4f3tcYzV7rGmH0d4Q5CaXj2qMyCd
0eVjpgW0h3z9kM3RA+d7BX7XKlkdQABliZUT9SUUcfIPvohXPKEzBRHed2kf6WVt
XKAuJTD+Dk3LjzRygWldOAE4mnLeZjU61kxPYriynyre+44Gpsgy37Tj25MAmVCY
Flotr/1WZx6bg3HIyFRGxnoJ1zU1MkGxwS4IsrQwOpWEHBiD5nvo54hF5I00NHj/
ccz+MwpgGdjyl02IGCy1fF+Q5SYyH86DG52Mgn8VI9dseGmanLGcgNvrdJFILoJR
SZW7gQoBAoGBAP+D6ZmRF7EqPNMypEHQ5qHHDMvil3mhNQJyIC5rhhl/nn063wnm
zhg96109hVh4zUAj3Rmjb9WqPiW7KBMJJdnEPjmZ/NOXKmgjs2BF+c8oiLQyTQml
xB7LnptvBDi8MnEd3uemfxNuZc+2siuSzgditshNru8xPG2Sn99JC271AoGBANp2
xj5EfdlqNLd11paLOtJ7dfREgc+8FxQCiKSxbaOlVXNk0DW1w4+zLnFohj2m/wRr
bBIzSL+eufoQ9y4BT/AA+ln4qxOpC0isOGK5SxwIjB6OHhCuP8L3anj1IFYM+NX0
Xr1/qdZHKulgbS49cq+TDpB74WyKLLnsvQFyINMXAoGABR5+cp4ujFUdTNnp4out
4zXasscCY+Rv7HGe5W8wC5i78yRXzZn7LQ8ohQCziDc7XXqadmYI2o4DmrvqLJ91
S6yb1omYQCD6L4XvlREx1Q2p13pegr/4cul/bvvFaOGUXSHNEnUKfLgsgAHYBfl1
+T3oDZFI3O/ulv9mBpIvEXUCgYEApeRnqcUM49o4ac/7wZm8czT5XyHeiUbFJ5a8
+IMbRJc6CkRVr1N1S1u/OrMqrQpwwIRqLm/vIEOB6hiT+sVYVGIJueSQ1H8baHYO
4zjdhk4fSNyWjAgltwF2Qp+xjGaRVrcYckHNUD/+n/VvMxvKSPUcrC7GAUvzpsPU
ypJFxsUCgYEA6GuP6M2zIhCYYeB2iLRD4ZHw92RfjikaYmB0++T0y2TVrStlzXHl
c8H6tJWNchtHH30nfLCj9WIMb/cODpm/DrzlSigHffo3+5XUpD/2nSrcFKESw4Xs
a4GXoAxqU44w4Mckg2E19b2MrcNkV9eWAyTACbEO4oFcZcSZOCKj8Fw=
-----END RSA PRIVATE KEY-----"
```

### Frontend Files

1. `App.tsx`:
```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentViewer } from './DocumentViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/documents/:documentId" element={<DocumentViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
```

2. `DocumentViewer.tsx`:
```typescript
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
      }).catch((err: Error) => {
        console.error('PSPDFKit error:', err);
        setError(`Failed to load PDF viewer: ${err.message}`);
      });
    }
  }, [viewerConfig]);

  if (error) return <div className="error">Error: {error}</div>;
  if (!viewerConfig) return <div>Loading...</div>;

  return (
    <div className="document-viewer">
      <h1>Document Viewer</h1>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}
```

3. `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document Viewer</title>
    <script src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@2024.8.1/pspdfkit.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## Running the Application

1. Start Document Engine:
```bash
docker-compose up
```

2. Start the backend:
```bash
cd document-engine-backend
npm run start:dev
```

3. Start the frontend:
```bash
cd document-engine-frontend
npm run dev
```

## Usage

1. Access the Document Engine dashboard at `http://localhost:5000/dashboard`
2. Log in with the default credentials:
   - Username: `dashboard`
   - Password: `secret`
3. Upload a document and note its ID
4. View the document at `http://localhost:5173/documents/{documentId}`

## Building for Production

### Backend:
```bash
cd document-engine-backend
npm run build
```

### Frontend:
```bash
cd document-engine-frontend
npm run build
```

## Support

For support, please visit [Nutrient Support](https://support.nutrient.io/hc/en-us/requests/new)

## Acknowledgments

- [PSPDFKit](https://pspdfkit.com/) for Document Engine
- [NestJS](https://nestjs.com/) framework
- [React](https://reactjs.org/) library