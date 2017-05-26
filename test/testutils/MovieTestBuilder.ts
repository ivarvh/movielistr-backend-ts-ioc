import Director from "../../src/models/Director";
import Movie from "../../src/models/Movie";
import DirectorTestBuilder from "./DirectorTestBuilder";

export default class MovieTestBuilder {

    private movie: Movie = new Movie();

    public static newMovie() {
        return new MovieTestBuilder();
    }

    public withId(id: number): MovieTestBuilder {
        this.movie.$id = id;
        return this;
    }
    public withTitle(title: string): MovieTestBuilder {
        this.movie.$title = title;
        return this;
    }
    public withReleaseYear(releaseYear: number): MovieTestBuilder {
        this.movie.$releaseYear = releaseYear;
        return this;
    }
    public withDuration(duration: number): MovieTestBuilder {
        this.movie.$duration = duration;
        return this;
    }
    public withRating(rating: number): MovieTestBuilder {
        this.movie.$rating = rating;
        return this;
    }
    public withSeen(seen: boolean): MovieTestBuilder {
        this.movie.$seen = seen;
        return this;
    }
    public withDirector(director: Director): MovieTestBuilder {
        this.movie.$director = director;
        return this;
    }

    public withDefaultValues(): MovieTestBuilder {
        return this
            .withTitle("title")
            .withDuration(100)
            .withRating(5)
            .withReleaseYear(2016)
            .withSeen(true)
            .withDirector(
            DirectorTestBuilder
                .newDirector()
                .withDefaultValues()
                .build());

    }

    public build(): Movie {
        return this.movie;
    }

    public static createListOfDefaultMovies(size: number) {
        const result = [];
        for (let i = 0; i < size; i++) {
            result.push(MovieTestBuilder.newMovie().withDefaultValues().withId(Math.random() * 10).build());
        }
        return result;
    }
}
