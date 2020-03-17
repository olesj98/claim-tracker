import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[dragDrop]' })
export class DragDropDirective {
    @Output() dragDrop: EventEmitter<FileList> = new EventEmitter<FileList>();

    @HostListener('dragover', ['$event']) ondragover(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('drop', ['$event']) ondrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.files.length) {
            this.dragDrop.emit(event.dataTransfer.files);
        }
    }
}
