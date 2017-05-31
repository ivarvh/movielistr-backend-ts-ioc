import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";

import Director from "./models/Director";
import Movie from "./models/Movie";
import Route from "./models/Route";
import DirectorRoutes from "./routes/DirectorRoutes";
import MovieRoutes from "./routes/MovieRoutes";

export default class MovieListr {

    constructor(
        @Inject private movieRoutes: MovieRoutes,
        @Inject private directorRoutes: DirectorRoutes) { }

    private async createApp() {
        await createConnection({
            name: "default",
            driver: {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "root",
                database: "movielistr",
            },
            entities: [
                Movie, Director,
            ],
        });

        const app: Koa = new Koa();
        const router: Router = new Router();

        this.movieRoutes.register(router);
        this.directorRoutes.register(router);

        app.use(logger());
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.createApp();
        console.log("Started listening on port 3000...");
        const server = app.listen(3000);
        return Promise.resolve(server);
    }

}
