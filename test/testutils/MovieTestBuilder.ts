import Movie from "../../src/models/Movie";
import { createRandomDirector } from "./DirectorTestBuilder";

export const createRandomMovie = (): Movie => {
    return Movie.newMovie("" + Math.random(), "title", 2000, 100, createRandomDirector(), 5, true);
};

export const createListOfRandomMovies = (size: number): Movie[] => {
    const result = [];
    for (let i = 0; i < size; i++) {
        result.push(createRandomMovie());
    }
    return result;
};

export const createRandomMovieRequestObject = () => {
    const movie: Movie = createRandomMovie();
    return {
        directorId: movie.$director.$id,
        duration: movie.$duration,
        rating: movie.$rating,
        releaseYear: movie.$releaseYear,
        seen: movie.$seen,
        title: movie.$title,
    };
};
