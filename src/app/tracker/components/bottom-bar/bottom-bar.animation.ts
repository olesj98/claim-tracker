import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const bottomBarAnimation = trigger('bottomBarAnimation', [
    transition(':enter', [
        query('.bottom-bar__nav-element', [
            style({ opacity: 0 }),
            stagger(100, [
                animate('.3s ease-in', style({ opacity: 1 }))
            ])
        ])
    ])
]);
