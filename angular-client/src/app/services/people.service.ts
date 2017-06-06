import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { ApiService } from "./api.service";

import { People } from "../entity/people";

@Injectable()
export class PeopleService extends ApiService {

    constructor(public http: Http) {
        super(http);
    }

    public getData(keyword: string) {
        return new Promise((resolve, reject) => {
            let request: Observable<any> = this.callApi("get", "/people", {
                    "params" : {
                        "keyword" : keyword,
                    },
                })
                .map((res) => res.json());

            request.subscribe(
                (data) => {
                    let p: People[]   = [];

                    if (data.success) {
                        let image: string = `http://farm${data.people.iconfarm}.staticflickr.com/${data.people.iconserver}` +
                            `/buddyicons/${data.people.nsid}_r.jpg`;

                        p.push({
                            "id"        : data.people.id,
                            "username"  : data.people.username._content,
                            "name"      : data.people.realname._content,
                            "image"     : image,
                            "followers" : 0,
                        });
                    }

                    resolve(p);
                },
            );
        });
    }

    public getUser(userId: string) {
        return new Promise((resolve, reject) => {
            let request: Observable<any> = this.callApi("get", "/user", {
                    "params" : {
                        "id" : userId,
                    },
                })
                .map((res) => res.json());

            request.subscribe(
                (data) => {
                    let image: string = `http://farm${data.user.iconfarm}.staticflickr.com/${data.user.iconserver}` +
                        `/buddyicons/${data.user.nsid}_r.jpg`;

                    let p: People = {
                        "id"        : data.user.id,
                        "username"  : data.user.username._content,
                        "name"      : data.user.realname._content,
                        "image"     : image,
                        "followers" : 0,
                    };

                    resolve(p);
                },
            );
        });
    }

    public getUserFollowers(userId: string) {
        return new Promise((resolve, reject) => {
            let request: Observable<any> = this.callApi("get", "/followers", {
                    "params" : {
                        "id" : userId,
                    },
                })
                .map((res) => res.json());

            request.subscribe(
                (data) => {
                    resolve(data.followers);
                },
            );
        });
    }

}
