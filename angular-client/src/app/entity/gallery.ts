import { Picture } from "./picture";

export class Gallery {

    public username: string;

    public totalViews: number;
    public totalFavorites: number;
    public totalComments: number;

    public pictures: Picture[];

    constructor() {
        this.username = "";

        this.totalViews     = 0;
        this.totalFavorites = 0;
        this.totalComments  = 0;

        this.pictures       = [];
    }

}
