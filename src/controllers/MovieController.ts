import { Context } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";

@Singleton
export default class MovieController {

    constructor( @Inject private movieService: MovieService) { }

    public async getAllMovies(ctx: Context) {
        ctx.body = await this.movieService.findAll();
    }

    public async findMovieById(ctx: Context) {
        try {
            ctx.body = await this.movieService.findById(ctx.params.id);
        } catch (e) {
            ctx.throw(404);
        }
    }

    public async saveMovie(ctx: Context) {
        const movie: Movie = ctx.request.body;
        const result = await this.movieService.saveMovie(movie);
        ctx.body = result;
    }

    public async deleteMovie(ctx: Context) {
        await this.movieService.deleteMovie(ctx.params.id);
        ctx.status = 200;
    }
}
