declare function require( name: string );

let request: any = require("request");
let cheerio: any = require("cheerio");

export class Scraper {

    private siteUrl: string = "https://flickr.com";

    public getUserFollowers(userId: string) {
        let url: string = this.siteUrl + "/photos/" + userId;

        return new Promise((resolve, reject) => {
            request(
                {
                    "method" : "GET",
                    "url"    : url,
                },
                (err, res, body) => {
                    if (err) {
                        reject(err);

                        return;
                    } else {
                        let $: any = cheerio.load(body);

                        let followers: number = parseInt(
                            $(".followers").clone().children().remove().end().text().trim().replace(/[^0-9]+/g, ""),
                            10,
                        );

                        resolve(followers);
                    }
                },
            );
        });
    }

}
