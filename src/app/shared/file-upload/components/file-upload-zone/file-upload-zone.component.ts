import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pko-file-upload-zone',
    templateUrl: './file-upload-zone.component.pug',
    styleUrls: ['./file-upload-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadZoneComponent {
    @Input() fileFor: string;
    @Input() multiple: boolean;
    @Input() dragDropEnabled: boolean;

    @Output() selected: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();

    files: Array<File> = [];

    trackByFilesIndex = (index: number) => index;

    onFilesReceived(files: FileList): void {
        if (this.multiple) {
            this.files = [ ...this.files, ...Array.from(files) ];
        } else {
            this.selected.emit(Array.from(files));
        }
    }

    removeAt(index: number): void {
        this.files.splice(index, 1);
    }

    onSelectedFromDrive(e: any): void {
        this.onFilesReceived(e.target.files);
    }

    onFilesDropped(fileList: FileList): void {
        this.onFilesReceived(fileList);
    }

    submit(): void {
        if (this.files.length) {
            this.selected.emit(this.files);
        }
    }
}
