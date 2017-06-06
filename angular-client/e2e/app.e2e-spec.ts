import { FlickrStatPage } from "./app.po";

describe("flickr-stat App", () => {
    let page: FlickrStatPage;

    beforeEach(() => {
        page = new FlickrStatPage();
    });

    it("should display welcome message", done => {
        page.navigateTo();
        page.getParagraphText()
            .then(msg => expect(msg).toEqual("Welcome to app!!"))
            .then(done, done.fail);
    });
});
