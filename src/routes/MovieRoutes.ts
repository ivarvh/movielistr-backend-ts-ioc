import { IRouterContext } from "koa-router";
import { Container, Inject } from "typescript-ioc";
import MovieController from "../controllers/MovieController";
import Route from "../models/Route";
import IRoutes from "./IRoutes";

export default class MovieRoutes extends IRoutes {

    constructor( @Inject private movieController: MovieController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/movies", "get", (ctx: IRouterContext) => this.movieController.getAllMovies(ctx)),
            Route.newRoute("/movies/:id", "get", (ctx: IRouterContext) => this.movieController.findMovieById(ctx)),
            Route.newRoute("/movies", "post", (ctx: IRouterContext) => this.movieController.saveMovie(ctx)),
            Route.newRoute("/movies/:id", "put", (ctx: IRouterContext) => this.movieController.updateMovie(ctx)),
            Route.newRoute("/movies/:id", "delete", (ctx: IRouterContext) => this.movieController.deleteMovie(ctx)),
        ];
    }
}
