import { Injectable } from "@angular/core";
import { ApiClient } from '../common/api.client';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AcademyService {
    constructor(private api: ApiClient) { }

    insert(data) {
        return this.api.post('academy/insert', data);
    }

    update(data) {
        return this.api.put('academy/update', data);
    }

    delete(academy_id) {
        return this.api.delete('academy/delete/' + academy_id);
    }

    all(
        pageIndex: number = 1,
        pageSize: number = 10,
        sortField: string,
        sortOrder: string,
        genders: string[]
    ): Observable<any> {
        let params = new HttpParams()
            .append('page', `${pageIndex}`)
            .append('results', `${pageSize}`)
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        return this.api.getO('academy/all', params);
    }

    single(academy_id) {
        return this.api.get('academy/single/' + academy_id);
    }
}