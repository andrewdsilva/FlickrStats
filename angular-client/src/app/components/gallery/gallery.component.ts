import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";

// Entities
import { Gallery } from "../../entity/gallery";
import { People } from "../../entity/people";

// Services
import { GalleryService } from "../../services/gallery.service";
import { PeopleService } from "../../services/people.service";

// Import rxjs map operator
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
    "selector"    : "gallery",
    "templateUrl" : "./gallery.html",
    "styleUrls"   : ["./gallery.css"],
})

export class GalleryComponent {

    public userId: string;
    public gallery: Gallery;
    public user: People;

    public maxPictures;

    constructor(
        private http: Http, private router: Router, private route: ActivatedRoute,
        public galleryService: GalleryService, public peopleService: PeopleService,
    ) {
        this.gallery     = new Gallery();
        this.user        = new People();
        this.userId      = "";
        this.maxPictures = 10;

        route.params.subscribe((params) => {
            if (params["user"]) {
                this.userId = params["user"];

                this.getUser();
                this.getGallery();
            }
        });
    }

    public getGallery() {
        this.galleryService.getData(this.userId)
            .then((gallery) => {
                this.gallery = gallery as Gallery;
            });
    }

    public getUser() {
        this.peopleService.getUser(this.userId)
            .then((user) => {
                this.user = user as People;

                this.peopleService.getUserFollowers(this.userId)
                    .then((followers: number) => {
                        this.user.followers = followers;
                    });
            });
    }

    public more() {
        this.maxPictures += 10;
    }

}
