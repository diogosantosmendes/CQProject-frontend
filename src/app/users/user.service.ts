// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'materialize-css';
import { toast } from 'materialize-css';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { UserProfile, UserDetails, UserDetailsToPost } from "./iUsers";
import { API } from '../../main';

@Injectable()
export class UserService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getUsersCount(roleID: number): Promise<number> {
        let response = await this._http
            .get(this._apiURL + `/role/pages/`+ roleID, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getUsersByPage(page: number, roleID: number): Promise<number[]>{
        let response = await this._http
        .get(this._apiURL + `/role/page/`+roleID+`/`+page, this._options)
        .toPromise();
        if (response.json().result) return response.json().data['info'];
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getProfile(userID: number): Promise<UserProfile> {
        let response = await this._http
            .get(this._apiURL + `/user/profile/${userID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getUserDetails(userID: number): Promise<UserDetails> {
        let response = await this._http
            .get(this._apiURL + `/user/detail/${userID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async createUser(user: UserDetailsToPost): Promise<string> {
        let response = await this._http
            .post(this._apiURL + `/user`, JSON.stringify(user), this._options)
            .toPromise();
        if (response.json().result)  {
            toast("Utilizador criado com sucesso",4000,"lime");
            return response.json().data;
        }
        else {
            toast(response.json().info,4000,"red");
        }
    }


    public async putUserDetails(user: UserDetailsToPost): Promise<string> {
        let response = await this._http
            .put(this._apiURL + `/user/profile`, JSON.stringify(user), this._options)
            .toPromise();
        if (response.json().result) {
            toast("Utilizador editado com sucesso",4000,"lime");
            return response.json().data;
        }
        else {
            toast(response.json().info,4000,"red");
        }
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}