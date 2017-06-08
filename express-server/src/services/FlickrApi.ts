declare function require( name: string );
declare var process;

let request: any = require("request");

export class FlickrApi {

    private serviceUrl: string = "https://api.flickr.com/services/rest/";
    private key: string;

    constructor() {
        this.key = process.env.FLICKR_API_KEY;
    }

    private getDataParameters() {
        return {
            "format"         : "json",
            "nojsoncallback" : "1",
            "api_key"        : this.key,
        };
    }

    public peopleGetPhotos(username: string) {
        let data: any = this.getDataParameters();

        data.method  = "flickr.people.getPhotos";
        data.user_id = username;
        data.extras  = "count_comments,count_faves,count_views,media,url_m,comments";

        return new Promise((resolve, reject) => {
            request(
                {
                    "method" : "GET",
                    "url"    : this.serviceUrl,
                    "qs"     : data,
                },
                (err, res, body) => {
                    if (err) {
                        reject(err);

                        return;
                    } else {
                        resolve(JSON.parse(body));
                    }
                },
            );
        });
    }

    public peopleFindByUsername(username: string) {
        let data: any = this.getDataParameters();

        data.method   = "flickr.people.findByUsername";
        data.username = username;

        return new Promise((resolve, reject) => {
            request(
                {
                    "method" : "GET",
                    "url"    : this.serviceUrl,
                    "qs"     : data,
                },
                (err, res, body) => {
                    if (err) {
                        reject(err);

                        return;
                    } else {
                        resolve(JSON.parse(body));
                    }
                },
            );
        });
    }

    public peopleGetInfo(id: string) {
        let data: any = this.getDataParameters();

        data.method  = "flickr.people.getInfo";
        data.user_id = id;

        return new Promise((resolve, reject) => {
            request(
                {
                    "method" : "GET",
                    "url"    : this.serviceUrl,
                    "qs"     : data,
                },
                (err, res, body) => {
                    if (err) {
                        reject(err);

                        return;
                    } else {
                        resolve(JSON.parse(body));
                    }
                },
            );
        });
    }

}
