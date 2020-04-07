import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[dragDrop]' })
export class DragDropDirective {
    @Input() disabled: boolean;

    @Output() dragDrop: EventEmitter<FileList> = new EventEmitter<FileList>();

    @HostListener('dragover', ['$event']) ondragover(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('drop', ['$event']) ondrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.files.length && !this.disabled) {
            this.dragDrop.emit(event.dataTransfer.files);
        }
    }
}
