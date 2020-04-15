import { InjectionToken } from '@angular/core';

export interface DocumentUploadConfig {
    extensions: Array<string>;
    maxSize: number;
    maxAllSize: number;
}

export const DEFAULT_DOCUMENT_CONFIG: DocumentUploadConfig = {
    extensions: [ 'jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt' ],
    maxSize: 20 * 1024 ** 2,
    maxAllSize: 50 * 1024 ** 2
};

export const DOCUMENT_UPLOAD_CONFIG = new InjectionToken<DocumentUploadConfig>('document.config', {
    providedIn: 'root',
    factory: () => DEFAULT_DOCUMENT_CONFIG
});
