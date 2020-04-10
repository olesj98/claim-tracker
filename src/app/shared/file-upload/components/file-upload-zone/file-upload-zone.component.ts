import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { DocumentChangeEvent } from '../../models';
import { DOCUMENT_UPLOAD_CONFIG, DocumentUploadConfig } from '../../providers';

@Component({
    selector: ' pko-file-upload-zone',
    templateUrl: './file-upload-zone.component.pug',
    styleUrls: ['./file-upload-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadZoneComponent {
    @Input() fileFor: string;
    @Input() dragDropEnabled: boolean;
    @Input() documentTypes: Array<string>;
    @Input() mobile: boolean;
    @Input() multiple: boolean;
    @Input()
    set withDocumentType(withType: boolean) {
        this._withDocumentType = withType;
        this._withDocumentType ?
            this.documentType.setValidators(Validators.required) :
            this.documentType.clearValidators();
    }
    get withDocumentType(): boolean {
        return this._withDocumentType;
    }

    @Output() selected: EventEmitter<DocumentChangeEvent> = new EventEmitter<DocumentChangeEvent>();

    acceptDocumentType: string;

    form = new FormGroup({
        documentType: new FormControl(null),
        files: new FormArray([], Validators.required)
    });

    private _withDocumentType: boolean;

    get files(): FormArray {
        return this.form.get('files') as FormArray;
    }

    get documentType(): FormControl {
        return this.form.get('documentType') as FormControl;
    }

    get documentTypePlaceholder(): string {
        return this.mobile ?
            'FILE_UPLOAD.SELECT' : 'FILE_UPLOAD.SELECT_TYPE';
    }

    get addDocumentTitle(): string {
        return this.mobile ?
            'FILE_UPLOAD.SEND_BY_MOBILE' : 'FILE_UPLOAD.DRAG_AND_DROP_OR';
    }

    get addDocumentActionTitle(): string {
        return this.mobile ?
            'FILE_UPLOAD.ADD_FROM_GALLERY' : 'FILE_UPLOAD.ADD_FROM_DRIVE';
    }

    constructor(@Inject(DOCUMENT_UPLOAD_CONFIG) private _config: DocumentUploadConfig) {
        this.acceptDocumentType = this._config.extensions
            .map(ext => `.${ext}`)
            .join(',');
    }

    onDocumentsReceived(files: FileList): void {
        if (this.multiple) {
            Array.from(files).forEach(file => this.files.push(new FormControl(file)));
        } else {
            this.files.clear();
            this.files.push(new FormControl(files.item(0)));
        }
    }

    addFromDrive(e: any): void {
        this.onDocumentsReceived(e.target.files);
    }

    onDocumentsDropped(fileList: FileList): void {
        this.onDocumentsReceived(fileList);
    }

    submit(): void {
        if (this.form.valid) {
            this.selected.emit(this.form.value);
        }

        this.documentType.reset();
        this.files.clear();
    }
}
