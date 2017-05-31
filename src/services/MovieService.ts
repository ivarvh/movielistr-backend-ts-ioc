import { Inject, Singleton } from "typescript-ioc";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Movie from "../models/Movie";
import MovieRepository from "../repositories/MovieRepository";
import DirectorService from "./DirectorService";

@Singleton
export default class MovieService {

    constructor( @Inject private movieRepository: MovieRepository) { }

    public async findById(id: number): Promise<Movie> {
        return this.movieRepository.findMovieById(id);
    }

    public async findAll(): Promise<Movie[]> {
        return this.movieRepository.getAllMovies();
    }

    public async update(movie: Movie): Promise<Movie> {
        try {
            await this.movieRepository.findMovieById(movie.$id);
            return this.movieRepository.saveMovie(movie);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity("The given movie does not exist yet.");
            }
            throw e;
        }
    }

    public async save(movie: Movie): Promise<Movie> {
        return this.movieRepository.saveMovie(movie);
    }

    public async delete(movieId: number): Promise<void> {
        return this.movieRepository.deleteMovie(movieId);
    }
}
