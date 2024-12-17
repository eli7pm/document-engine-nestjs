import { Controller, Get, Param } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':documentId/view')
  getDocumentView(@Param('documentId') documentId: string) {
    return this.documentsService.getDocumentView(documentId);
  }
}