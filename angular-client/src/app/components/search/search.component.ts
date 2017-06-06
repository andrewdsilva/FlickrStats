import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";

// Entities
import { People } from "../../entity/people";

// Services
import { PeopleService } from "../../services/people.service";

// Import rxjs map operator
import "rxjs/add/operator/map";

@Component({
    "selector"    : "search",
    "templateUrl" : "./search.html",
    "styleUrls"   : ["./search.css"],
})

export class SearchComponent {

    public keyword: string;
    public people: People[];

    constructor(private http: Http, private router: Router, private route: ActivatedRoute, public peopleService: PeopleService) {
        this.keyword = "";

        route.params.subscribe((params) => {
            if (params["keyword"]) {
                this.keyword = params["keyword"];

                this.search();
            }
        });
    }

    public search() {
        if (this.keyword) {
            this.peopleService.getData(this.keyword)
                .then((people) => {
                    this.people = people as People[];
                });
        }
    }

}
