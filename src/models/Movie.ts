import Director from "./Director";

export default class Movie {

    private id: number;
    private title: string;
    private releaseYear: number;
    private duration: number;
    private director: Director;

    constructor() { }

    public static newMovie(id: number, title: string, releaseYear: number, duration: number, director: Director) {
        const movie = new Movie();
        movie.id = id;
        movie.title = title;
        movie.releaseYear = releaseYear;
        movie.duration = duration;
        movie.director = director;
        return movie;
    }

    public get $id(): number {
        return this.id;
    }

    public get $title(): string {
        return this.title;
    }

    public set $title(value: string) {
        this.title = value;
    }

    public get $releaseYear(): number {
        return this.releaseYear;
    }

    public set $releaseYear(value: number) {
        this.releaseYear = value;
    }

    public get $duration(): number {
        return this.duration;
    }

    public set $duration(value: number) {
        this.duration = value;
    }

    public get $director(): Director {
        return this.director;
    }

    public set $director(value: Director) {
        this.director = value;
    }
}