declare function require( name: string );

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

    private scripts: string[];

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        this.scripts  = [];
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRoute {
        this.scripts.push(src);

        return this;
    }

    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    public render(req: any, res: any, view: string, options?: any) {
        // Add constants
        res.locals.BASE_URL = "/";

        // Add scripts
        res.locals.scripts = this.scripts;

        // Render view
        res.render(view, options);
    }

}
