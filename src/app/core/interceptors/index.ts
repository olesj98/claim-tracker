import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';

export const CORE_INTERCEPTORS: Array<Provider> = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
