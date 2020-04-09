import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DocumentChangeEvent } from '../../models';

@Component({
    selector: 'pko-file-upload-zone',
    templateUrl: './file-upload-zone.component.pug',
    styleUrls: ['./file-upload-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadZoneComponent {
    @Input() fileFor: string;
    @Input() dragDropEnabled: boolean;
    @Input() withDocumentType: boolean;
    @Input() documentTypes: Array<string>;
    @Input() mobile: boolean;

    @Output() selected: EventEmitter<DocumentChangeEvent> = new EventEmitter<DocumentChangeEvent>();

    form = new FormGroup({
        documentType: new FormControl(null, Validators.required),
        file: new FormControl(null, Validators.required)
    });

    onFilesReceived(files: FileList): void {
        this.form.get('file').setValue(files.item(0));

        /* @todo improvements */

        if (this.withDocumentType) {
            if (this.form.get('documentType').valid) {
                this.emitSelection();
            }
        } else {
            this.emitSelection();
        }
    }

    onSelectedFromDrive(e: any): void {
        this.onFilesReceived(e.target.files);
    }

    onFilesDropped(fileList: FileList): void {
        this.onFilesReceived(fileList);
    }

    emitSelection() {
        this.selected.emit(this.form.value);
    }
}
