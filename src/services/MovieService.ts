import { Inject, Singleton } from "typescript-ioc";
import Movie from "../models/Movie";
import MovieRepository from "../repositories/MovieRepository";
import DirectorService from "./DirectorService";

@Singleton
export default class MovieService {

    constructor(
        @Inject private movieRepository: MovieRepository,
    ) { }

    public async findById(id: number): Promise<Movie> {
        return this.movieRepository.findMovieById(id);
    }

    public async findAll(): Promise<Movie[]> {
        return this.movieRepository.getAllMovies();
    }

    public async saveMovie(movie: Movie): Promise<Movie> {
        return this.movieRepository.saveMovie(movie);
    }

    public async deleteMovie(movieId: number): Promise<void> {
        return this.movieRepository.deleteMovie(movieId);
    }
}
