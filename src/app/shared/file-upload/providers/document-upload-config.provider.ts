import { InjectionToken } from '@angular/core';

export interface DocumentUploadConfig {
    extensions: Array<string>;
}

export const DEFAULT_DOCUMENT_CONFIG: DocumentUploadConfig = {
    extensions: [ 'jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt' ]
};

export const DOCUMENT_UPLOAD_CONFIG = new InjectionToken<DocumentUploadConfig>('document.config', {
    providedIn: 'root',
    factory: () => DEFAULT_DOCUMENT_CONFIG
});
