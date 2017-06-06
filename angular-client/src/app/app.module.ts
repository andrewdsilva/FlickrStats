import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./components/app/app.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { SearchComponent } from "./components/search/search.component";

import { AppRoutingModule } from "./app-routing.module";

import { GalleryService } from "./services/gallery.service";
import { PeopleService } from "./services/people.service";

@NgModule({
    "declarations": [
        AppComponent,
        GalleryComponent,
        SearchComponent,
    ],
    "imports": [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
    ],
    "providers": [
        GalleryService,
        PeopleService,
    ],
    "bootstrap": [AppComponent],
})

export class AppModule {}
