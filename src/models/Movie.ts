import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Director from "./Director";

@Entity()
export default class Movie {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private title: string;

    @Column()
    private releaseYear: number;

    @Column()
    private duration: number;

    @Column()
    private rating: number = 0;

    @Column()
    private seen: boolean = false;

    @OneToOne((type) => Director, { cascadeAll: true })
    @JoinColumn()
    private director: Director;

    public static newMovie(title: string, releaseYear: number, duration: number, director: Director, rating: number, seen: boolean) {
        const movie = new Movie();
        movie.title = title;
        movie.releaseYear = releaseYear;
        movie.duration = duration;
        movie.director = director;
        movie.rating = rating;
        movie.seen = seen;
        return movie;
    }

    public get $id(): number {
        return this.id;
    }

    public set $id(id: number) {
        this.id = id;
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

    public get $rating(): number {
        return this.rating;
    }

    public set $rating(value: number) {
        this.rating = value;
    }

    public get $seen(): boolean {
        return this.seen;
    }

    public set $seen(value: boolean) {
        this.seen = value;
    }
}
