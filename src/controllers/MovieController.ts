import { IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";

@Singleton
export default class MovieController {

    constructor( @Inject private movieService: MovieService) { }

    public async getAllMovies(ctx: IRouterContext) {
        ctx.body = await this.movieService.findAll();
    }

    public async findMovieById(ctx: IRouterContext) {
        try {
            ctx.body = await this.movieService.findById(ctx.params.id);
        } catch (e) {
            ctx.throw(404);
        }
    }

    public async updateMovie(ctx: IRouterContext) {
        try {
            const movie: Movie = Movie.newMovie(ctx.request.body);
            if (String(ctx.params.id) !== String(movie.$id)) {
                ctx.throw(400);
            }
            ctx.body = await this.movieService.update(movie);
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async saveMovie(ctx: IRouterContext) {
        try {
            const movie: Movie = Movie.newMovie(ctx.request.body);
            const result = await this.movieService.save(movie);
            ctx.body = result;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async deleteMovie(ctx: IRouterContext) {
        try {
            await this.movieService.delete(ctx.params.id);
            ctx.status = 200;
        } catch (e) {
            ctx.throw(404, e.message);
        }
    }
}
