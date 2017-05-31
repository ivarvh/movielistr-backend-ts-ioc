import { Singleton } from "typescript-ioc";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Director from "../models/Director";
import Movie from "../models/Movie";
import IRepository from "./IRepository";

@Singleton
export default class MovieRepository extends IRepository {

    public async getAllMovies(): Promise<Movie[]> {
        return this.getMovieRepository()
            .find({
                alias: "movie",
                leftJoinAndSelect: {
                    director: "movie.director",
                },
            });
    }

    public async findMovieById(id: number): Promise<Movie> {
        const result = await this.getMovieRepository()
            .findOneById(id, {
                alias: "movie",
                leftJoinAndSelect: {
                    director: "movie.director",
                },
            });
        if (!result) {
            throw new EntityNotFoundError();
        }
        return result;
    }

    public async saveMovie(movie: Movie): Promise<Movie> {
        const director = await this.getDirectorRepository().findOneById(movie.$director.$id);
        if (!director) {
            throw new BadRequestEntity("No director found for this ID: " + movie.$director.$id);
        }
        return this.getMovieRepository().persist(movie);
    }

    public async deleteMovie(id: number): Promise<void> {
        const movie = await this.getMovieRepository().findOneById(id);
        if (!movie) {
            throw new EntityNotFoundError("No movie found with this ID");
        }
        await this.getMovieRepository()
            .createQueryBuilder("movie")
            .delete()
            .where("movie.id = :id", { id })
            .execute();
        return Promise.resolve();
    }

    public async deleteMoviesFromDirector(directorId: number): Promise<void> {
        await this.getMovieRepository()
            .createQueryBuilder("movie")
            .delete()
            .where("movie.director.id = :directorId", { directorId })
            .execute();
        return Promise.resolve();
    }

}
