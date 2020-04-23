import { animate, style, transition, trigger } from '@angular/animations';

export const userMenuAnimation = {
    tooltip: trigger('userTooltip', [
        transition(':enter', [
            style({ transform: 'translateY(10px)', opacity: '0' }),
            animate('0.175s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({ transform: 'translateY(0)', opacity: '1' }))
        ])
    ])
};
