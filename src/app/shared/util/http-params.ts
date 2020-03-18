import { HttpParams } from '@angular/common/http';

export const asHttpParams = (data: {}): HttpParams => {
    let params = new HttpParams();

    Object.keys(data).forEach(param => {
        if (!!data[param]) {
            params = params.set(param, data[param]);
        }
    });

    return params;
};
