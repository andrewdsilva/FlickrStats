import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { ApiService } from "./api.service";

import { Gallery } from "../entity/gallery";

@Injectable()
export class GalleryService extends ApiService {

    constructor( public http: Http, public router: Router ) {
        super( http );
    }

    public getData(username: string) {
        return new Promise((resolve, reject) => {
            let request: Observable<any> = this.callApi("get", "/gallery", {
                    "params" : {
                        "username" : username,
                    },
                })
                .map((res) => res.json());

            request.subscribe(
                (data) => {
                    let g: Gallery = new Gallery();

                    g.username = username;

                    for (let photo of data.photos) {
                        g.pictures.push({
                            "image"     : photo.url_m,
                            "name"      : photo.title,
                            "url"       : "https://flickr.com/" + username + "/" + photo.id,
                            "views"     : photo.count_views,
                            "favorites" : photo.count_faves,
                            "comments"  : photo.count_comments,
                        });

                        g.totalComments  += parseInt(photo.count_comments, 10);
                        g.totalFavorites += parseInt(photo.count_faves, 10);
                        g.totalViews     += parseInt(photo.count_views, 10);
                    }

                    g.pictures.sort((a, b) => {
                        return b.views - a.views;
                    });

                    resolve(g);
                },
            );
        });
    }

}
