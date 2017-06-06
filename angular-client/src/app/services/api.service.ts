import { Headers, Http } from "@angular/http";

export class ApiService {

    protected urlApi: string = "http://localhost:3000";
    protected decodedJwt: any;

    constructor(public http: Http) {}

    public callApi(method, url, data) {
        return this.http[ method ]( this.urlApi + url, data );
    }
}
