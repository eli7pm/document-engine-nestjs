# Document Engine with NestJS and React

This project demonstrates how to integrate Document Engine with a NestJS backend and React frontend.

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

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- A Document Engine license (for production use)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/eli7pm/document-engine-nestjs.git
cd document-engine-nestjs
```

2. Start Document Engine:
```bash
docker-compose up
```

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

Create a `.env` file in the backend directory:

```env
JWT_PRIVATE_KEY="your-private-key"
```

### Frontend Configuration

The frontend is configured to connect to:
- Backend API at `http://localhost:3000`
- Document Engine at `http://localhost:5000`

## Running the Application

1. Start Document Engine (if not already running):
```bash
docker-compose up
```

2. Start the backend (in a new terminal):
```bash
cd document-engine-backend
npm run start:dev
```

3. Start the frontend (in a new terminal):
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

## Key Files

### Backend

`documents.controller.ts`:
```typescript
@Controller('api/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':documentId/view')
  getDocumentView(@Param('documentId') documentId: string) {
    return this.documentsService.getDocumentView(documentId);
  }
}
```

### Frontend

`DocumentViewer.tsx`:
```typescript
export function DocumentViewer() {
  // ... component code
}
```

## Development

### Backend Development

The NestJS backend provides:
- Document viewing endpoints
- JWT generation
- Authentication handling

### Frontend Development

The React frontend includes:
- Document viewer component
- PSPDFKit integration
- Responsive layout

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