import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import "sinon-chai";
import { instance, mock, verify, when } from "ts-mockito";

import Director from "../../src/models/Director";
import Movie from "../../src/models/Movie";
import MovieRepository from "../../src/repositories/MovieRepository";
import DirectorService from "../../src/services/DirectorService";
import MovieService from "../../src/services/MovieService";
import DirectorTestBuilder from "../testutils/DirectorTestBuilder";
import MovieTestBuilder from "../testutils/MovieTestBuilder";

describe("MovieService", () => {

    let serviceUnderTest: MovieService;
    let movieRepository: MovieRepository;

    const directorId = 80085;
    const movieId = 4141;
    const director: Director = DirectorTestBuilder.newDirector().withDefaultValues().build();
    const movieList = MovieTestBuilder.createListOfDefaultMovies(5);
    const moviewithId = MovieTestBuilder.newMovie().withDefaultValues().withId(movieId).build();
    const moviewithoutId = MovieTestBuilder.newMovie().withDefaultValues().build();

    beforeEach(() => {
        movieRepository = mock(MovieRepository);

        serviceUnderTest = new MovieService(
            instance(movieRepository),
        );
    });

    describe("findAll", () => {

        it("should return all the movies", async () => {
            when(movieRepository.getAllMovies()).thenReturn(Promise.resolve(movieList));
            const result = await serviceUnderTest.findAll();
            expect(result).to.equal(movieList);
        });

    });

    describe("findById", () => {

        it("should return the movie with given ID", async () => {
            when(movieRepository.findMovieById(movieId)).thenReturn(Promise.resolve(moviewithId));
            const actual = await serviceUnderTest.findById(moviewithId.$id);
            expect(actual).to.equal(moviewithId);
        });

    });

    describe("saveMovie", () => {

        it("should save the given movie", async () => {
            when(movieRepository.saveMovie(moviewithoutId)).thenReturn(Promise.resolve(moviewithId));
            const actual = await serviceUnderTest.save(moviewithoutId);
            expect(actual).to.equal(moviewithId);
        });

    });

    describe("deleteMovie", () => {

        it("should delete the given movie", async () => {
            when(movieRepository.deleteMovie(movieId)).thenReturn(Promise.resolve());
            const actual = await serviceUnderTest.delete(movieId);
            verify(movieRepository.deleteMovie(movieId)).called();
        });

    });

});
