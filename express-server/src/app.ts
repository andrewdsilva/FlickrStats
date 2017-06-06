declare function require( name: string );
declare var __dirname;

const bodyParser: any = require("body-parser");
const cors: any       = require("cors");
const express: any    = require("express");

import { Routing } from "./route/Routing";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: any;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // Create expressjs application
        this.app = express();

        // Parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ "extended": false }));
        this.app.use(cors());

        // Cross Origin middleware
        this.app.use((req, res, next) => {
            let headers: string = "" +
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type," +
                "Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token," +
                "Authorization";

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", headers);
            res.setHeader("Access-Control-Max-Age", "1000");

            next();
        });

        // Configure routes
        this.routes();
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        let router: any = express.Router();

        // Public routes
        Routing.create(router);

        // Use router middleware
        this.app.use(router);
    }

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

}
