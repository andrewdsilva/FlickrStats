declare function require( name: string );

import { BaseRoute } from "./BaseRoute";

import { FlickrApi } from "../services/FlickrApi";
import { Scraper } from "../services/Scraper";

export class Routing extends BaseRoute {

    private api: FlickrApi;
    private scraper: Scraper;

    constructor() {
        super();

        this.api     = new FlickrApi();
        this.scraper = new Scraper();
    }

    public static create(router: any) {
        console.log("[Routing::gallery] Creating gallery route.");

        router.get("/gallery", (req: any, res: any, next: any) => {
            new Routing().gallery(req, res, next);
        });

        console.log("[Routing::people] Creating people route.");

        router.get("/people", (req: any, res: any, next: any) => {
            new Routing().people(req, res, next);
        });

        console.log("[Routing::user] Creating user route.");

        router.get("/user", (req: any, res: any, next: any) => {
            new Routing().user(req, res, next);
        });

        console.log("[Routing::followers] Creating followers route.");

        router.get("/followers", (req: any, res: any, next: any) => {
            new Routing().followers(req, res, next);
        });
    }

    public gallery(req: any, res: any, next: any) {
        let response: any = {
            "success"  : true,
            "username" : "",
            "photos"   : [],
        };

        // No username
        if (!req.query.username) {
            response.success = false;

            res.status(200).json(response);
        }

        response.username = req.query.username;

        this.api.peopleGetPhotos(response.username)
            .then((data: any) => {
                // No photos data
                if (!data.photos) {
                    response.success = false;

                    res.status(200).json(response);
                }

                response.photos = data.photos.photo;

                res.status(200).json(response);
            });
    }

    public people(req: any, res: any, next: any) {
        let response: any = {
            "success"  : true,
            "keyword"  : "",
            "people"   : [],
        };

        // No keyword
        if (!req.query.keyword) {
            response.success = false;

            res.status(200).json(response);
        }

        response.keyword = req.query.keyword;

        this.api.peopleFindByUsername(response.keyword)
            .then((data: any) => {
                // Not found
                if (data.stat !== "ok") {
                    response.success = false;

                    res.status(200).json(response);
                }

                this.api.peopleGetInfo(data.user.id)
                    .then((userData: any) => {
                        response.people = userData.person;

                        res.status(200).json(response);
                    });
            });
    }

    public user(req: any, res: any, next: any) {
        let response: any = {
            "success"   : true,
            "id"        : "",
            "user"      : {},
            "followers" : 0,
        };

        // No id
        if (!req.query.id) {
            response.success = false;

            res.status(200).json(response);
        }

        response.id = req.query.id;

        this.api.peopleGetInfo(response.id)
            .then((userData: any) => {
                response.user = userData.person;

                res.status(200).json(response);
            });
    }

    public followers(req: any, res: any, next: any) {
        let response: any = {
            "success"   : true,
            "id"        : "",
            "followers" : 0,
        };

        // No id
        if (!req.query.id) {
            response.success = false;

            res.status(200).json(response);
        }

        response.id = req.query.id;

        this.scraper.getUserFollowers(response.id)
            .then((nbFollowers: number) => {
                response.followers = nbFollowers;

                res.status(200).json(response);
            });
    }

}
