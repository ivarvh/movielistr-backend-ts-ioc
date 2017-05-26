import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";

import Route from "./models/Route";
import DirectorRoutes from "./routes/DirectorRoutes";
import MovieRoutes from "./routes/MovieRoutes";

export default class MovieListr {

    constructor(
        @Inject private movieRoutes: MovieRoutes,
        @Inject private directorRoutes: DirectorRoutes) { }

    public async start() {
        await createConnection();

        const app = new Koa();
        const router = new Router();

        this.movieRoutes.register(router);
        this.directorRoutes.register(router);

        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());

        console.log("Started listening on port 3000...");
        app.listen(3000);

    }

}
