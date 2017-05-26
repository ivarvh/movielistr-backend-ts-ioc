import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";

import { createConnection } from "typeorm";
import Route from "./models/Route";
import directorRoutes from "./routes/DirectorRoutes";
import movieRoutes from "./routes/MovieRoutes";

createConnection().then((connection) => {

    const app = new Koa();
    const router = new Router();

    const registerRoute = (route: Route) => {
        switch (route.$method) {
            case ("get"):
                router.get(route.$path, route.$action);
                break;
            case ("post"):
                router.post(route.$path, route.$action);
                break;
            case ("put"):
                router.put(route.$path, route.$action);
                break;
            case ("delete"):
                router.delete(route.$path, route.$action);
                break;
        }
    };

    movieRoutes().forEach(registerRoute);
    directorRoutes().forEach(registerRoute);

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    console.log("Started listening on port 3000...");
    app.listen(3000);

});
