import * as Router from "koa-router";
import Route from "../models/Route";

export abstract class IRoutes {

    protected abstract getRoutes(): Route[];

    public register(router: Router) {
        this.getRoutes().forEach((route) => {
            this.registerRoute(route, router);
        });
    }

    private registerRoute = (route: Route, router: Router) => {
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
    }

}

export default IRoutes;
