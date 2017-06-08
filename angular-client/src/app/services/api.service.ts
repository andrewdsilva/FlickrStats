import { Headers, Http } from "@angular/http";

export class ApiService {

    protected urlApi: string = location.protocol + "//" + location.host.replace(/:[0-9]+/g, "") + ":3042";
    protected decodedJwt: any;

    constructor(public http: Http) {}

    public callApi(method, url, data) {
        return this.http[ method ]( this.urlApi + url, data );
    }

}
