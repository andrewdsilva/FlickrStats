import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { SearchComponent } from "./components/search/search.component";

const routes: Routes = [
    { "path": "",              "component": SearchComponent },
    { "path": "search",        "component": SearchComponent },
    { "path": "search/:keyword",  "component": SearchComponent },
    { "path": "gallery/:user", "component": GalleryComponent },
];

@NgModule({
    "imports": [ RouterModule.forRoot(routes) ],
    "exports": [ RouterModule ],
})

export class AppRoutingModule {}
