import Director from 'src/models/Director';
import IDUtils from './../utils/IDUtils';
import { Inject, Singleton } from 'typescript-ioc';
import DirectorService from "./DirectorService";
import Movie from "../models/Movie";

@Singleton
export default class MovieService {

    constructor(
        @Inject private directorService: DirectorService,
        @Inject private idUtils: IDUtils
    ) { }

    private movies: Array<Movie> = [];

    public addMovie(title: string, duration: number, releaseYear: number, directorId: string, rating: number, seen: boolean): Movie {
        const director = this.directorService.findById(directorId);
        const newMovie = Movie.newMovie(
            this.idUtils.generateUniqueId(), title, releaseYear, duration, director, rating, seen
        );

        this.movies.push(newMovie);

        return newMovie;
    }

    public updateMovie(id: string, title: string, duration: number, releaseYear: number, directorId: string, rating: number, seen: boolean) {
        const currentValue: Movie = this.findById(id);
        currentValue.$title = title;
        currentValue.$duration = duration;
        currentValue.$releaseYear = releaseYear;
        if (currentValue.$director.$id != directorId) {
            currentValue.$director = this.directorService.findById(directorId);
        }
        currentValue.$rating = rating;
        currentValue.$seen = seen;
        return currentValue;
    }

    public findById(id: string): Movie {
        const movie = this.movies.find(movie => movie.$id === id);
        if (!movie) {
            throw new Error("No movie found with ID");
        }
        return movie;
    }

    public findAll(): Array<Movie> {
        return this.movies;
    }

}