import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

type DocumentView = {
  documentId: string;
  jwt: string;
};

type JwtClaims = {
  document_id: string;
  permissions: string[];
};

@Injectable()
export class DocumentsService {
  private readonly JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

  generateJwt(documentId: string): string {
    const claims: JwtClaims = {
      document_id: documentId,
      permissions: ['read-document', 'write', 'download'],
    };

    return sign(claims, this.JWT_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60 * 60,
      allowInsecureKeySizes: true,
    });
  }

  getDocumentView(documentId: string): DocumentView {
    const jwt = this.generateJwt(documentId);
    return { documentId, jwt };
  }
}
