import { Link } from '@pko/core';

export enum DocumentLinkRel {
    File = 'Document.file'
}

export interface DocumentReference {
    documentType: string;
    name: string;
    createDate: string;
    links?: Array<Link>;
}
