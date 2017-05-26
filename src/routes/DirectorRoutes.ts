import { IMiddleware, IRouterContext } from "koa-router";
import { Container, Inject } from "typescript-ioc";
import DirectorController from "../controllers/DirectorController";
import Route from "../models/Route";
import IRoutes from "./IRoutes";

export default class DirectorRoutes extends IRoutes {

    constructor( @Inject private directorController: DirectorController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/directors", "get", (ctx: IRouterContext) => this.directorController.getAllDirectors(ctx)),
            Route.newRoute("/directors/:id", "get", (ctx: IRouterContext) => this.directorController.findDirectorById(ctx)),
            Route.newRoute("/directors/", "post", (ctx: IRouterContext) => this.directorController.saveDirector(ctx)),
            Route.newRoute("/directors/:id", "put", (ctx: IRouterContext) => this.directorController.saveDirector(ctx)),
            Route.newRoute("/directors/:id", "delete", (ctx: IRouterContext) => this.directorController.deleteDirector(ctx)),
        ];
    }

}
