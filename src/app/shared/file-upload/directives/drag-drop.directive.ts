import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[dragDrop]' })
export class DragDropDirective {
    @Input() disabled: boolean;

    @Output() dragDrop: EventEmitter<FileList> = new EventEmitter<FileList>();

    @HostBinding('class.dragover') dragover: boolean;

    @HostListener('dragover', ['$event']) ondragover(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragover = true;
    }

    @HostListener('dragleave', []) ondragleave(): void {
        this.dragover = false;
    }

    @HostListener('drop', ['$event']) ondrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragover = false;

        if (event.dataTransfer.files.length && !this.disabled) {
            this.dragDrop.emit(event.dataTransfer.files);
        }
    }
}
