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

    @OneToOne((type) => Director, { cascadeInsert: false, cascadeRemove: true, nullable: false })
    @JoinColumn()
    private director: Director;

    public static newMovie(obj: { id?: number, title?: string, releaseYear?: number, duration?: number, director?: object, rating?: number, seen?: boolean }): Movie {
        const movie = new Movie();
        if (obj.id) movie.id = obj.id;
        if (obj.title) movie.title = obj.title;
        if (obj.releaseYear) movie.releaseYear = obj.releaseYear;
        if (obj.duration) movie.duration = obj.duration;
        if (obj.director) movie.director = Director.newDirector(obj.director);
        if (obj.rating) movie.rating = obj.rating;
        if (obj.seen) movie.seen = obj.seen;
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
