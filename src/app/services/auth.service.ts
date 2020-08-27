import { Injectable } from '@angular/core';
import { ApiClient } from '../common/api.client';
import { TokenService } from './../services/token.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private api: ApiClient, private tokenService: TokenService) { }

    login(data) {
        return this.api.post('auth/admin/login', data);
    }
    
    logout(){
        this.tokenService.logout();
    }
}