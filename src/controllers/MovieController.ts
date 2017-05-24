import { Context } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import MovieService from "../services/MovieService";

interface IMovieRequest {
    title: string;
    duration: number;
    releaseYear: number;
    directorId: string;
    rating: number;
    seen: boolean;
}

@Singleton
export default class MovieController {

    constructor( @Inject private movieService: MovieService) { }

    public getAllMovies: IMiddleware = (ctx: Context) => {
        const movies = this.movieService.findAll();
        console.log(JSON.stringify(movies));
        ctx.body = movies;
    }

    public findMovieById: IMiddleware = (ctx: Context) => {
        try {
            ctx.body = this.movieService.findById(ctx.params.id);
        } catch (e) {
            ctx.throw(404, "No movie found with this ID.");
        }
    }

    public addMovie: IMiddleware = (ctx: Context) => {
        const body: IMovieRequest = ctx.request.body;
        const newMovie = this.movieService.addMovie(body.title, body.duration, body.releaseYear, body.directorId, body.rating, body.seen);
        ctx.body = newMovie;
    }
}
