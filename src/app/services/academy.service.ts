import { Injectable } from "@angular/core";
import { ApiClient } from '../common/api.client';

@Injectable({
    providedIn: 'root'
})

export class AcademyService {
    constructor (private api: ApiClient){}

    insert(data){
        return this.api.post('academy/insert', data);
    }

    update(data){
        return this.api.put('academy/update', data);
    }

    delete(academy_id){
        return this.api.delete('academy/delete/'+academy_id);
    }

    all(){
        return this.api.get('academy/all');
    }

    single(academy_id){
        return this.api.get('academy/single/'+academy_id);
    }
}