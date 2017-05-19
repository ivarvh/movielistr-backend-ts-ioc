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
