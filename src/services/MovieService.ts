import Director from "src/models/Director";
import { Inject, Singleton } from "typescript-ioc";
import Movie from "../models/Movie";
import IDUtils from "./../utils/IDUtils";
import DirectorService from "./DirectorService";

@Singleton
export default class MovieService {

    private movies: Movie[] = [];

    constructor(
        @Inject private directorService: DirectorService,
        @Inject private idUtils: IDUtils,
    ) { }

    public addMovie(title: string, duration: number, releaseYear: number, directorId: string, rating: number, seen: boolean): Movie {
        const director = this.directorService.findById(directorId);
        const newMovie = Movie.newMovie(
            this.idUtils.generateUniqueId(), title, releaseYear, duration, director, rating, seen,
        );

        this.movies.push(newMovie);

        return newMovie;
    }

    public updateMovie(id: string, title: string, duration: number, releaseYear: number, directorId: string, rating: number, seen: boolean) {
        const currentValue: Movie = this.findById(id);
        currentValue.$title = title;
        currentValue.$duration = duration;
        currentValue.$releaseYear = releaseYear;
        if (currentValue.$director.$id !== directorId) {
            currentValue.$director = this.directorService.findById(directorId);
        }
        currentValue.$rating = rating;
        currentValue.$seen = seen;
        return currentValue;
    }

    public findById(id: string): Movie {
        const foundMovie = this.movies.find((movie) => movie.$id === id);
        if (!foundMovie) {
            throw new Error("No movie found with ID");
        }
        return foundMovie;
    }

    public findAll(): Movie[] {
        return this.movies;
    }

}
