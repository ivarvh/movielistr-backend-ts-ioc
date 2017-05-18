import { Inject, Singleton } from 'typescript-ioc';
import MovieService from "../services/MovieService";
import { IRouterContext, IMiddleware } from 'koa-router';
import { Context } from 'koa';

type MovieRequest = { title: string, duration: number, releaseYear: number, directorId: number };

@Singleton
export default class MovieController {

    @Inject
    private movieService: MovieService;

    constructor() {
    }

    public getAllMovies: IMiddleware = (ctx: IRouterContext, next: () => Promise<any>) => {
        ctx.body = this.movieService.findAll();
    }

    public findMovieById: IMiddleware = (ctx: IRouterContext, next: () => Promise<any>) => {
        this.movieService.findById(ctx.params.id);
    }

    public addMovie: IMiddleware = (ctx: IRouterContext, next: () => Promise<any>) => {
        const body: MovieRequest = ctx.request.body;
        const newMovie = this.movieService.addMovie(body.title, body.duration, body.releaseYear, body.directorId);
        ctx.body = newMovie;
    }
}