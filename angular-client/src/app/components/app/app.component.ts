import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    "selector"    : "app",
    "templateUrl" : "./app.html",
    "styleUrls"   : ["./app.css"],
})

export class AppComponent {

    constructor( private http: Http ) {}

}
