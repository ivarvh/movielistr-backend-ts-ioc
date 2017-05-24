import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import {instance, mock, verify, when} from "ts-mockito";
import MovieController from "../../src/controllers/MovieController";
import Director from "../../src/models/Director";
import Movie from "../../src/models/Movie";
import DirectorService from "../../src/services/DirectorService";
import MovieService from "../../src/services/MovieService";
import IDUtils from "../../src/utils/IDUtils";
import { createListOfRandomMovies, createRandomMovie, createRandomMovieRequestObject } from "./../testutils/MovieTestBuilder";

describe("MovieController", () => {

    let controllerUnderTest: MovieController;
    let movieService: MovieService;
    const nextFunction = () => Promise.resolve();

    beforeEach(() => {
        movieService = mock(MovieService);
        controllerUnderTest = new MovieController(instance(movieService));
    });

    describe("getAllMovies", () => {

        it("puts the movies on the body", () => {
            const movies = createListOfRandomMovies(5);
            when(movieService.findAll()).thenReturn(movies);
            const ctx: Context = {} as Context;

            const value = controllerUnderTest.getAllMovies(ctx, nextFunction);

            expect(ctx.body).to.equal(movies);
        });
    });

    describe("findMovieById", () => {

        it("puts the found the found movie on the body", () => {
            const movie: Movie = createRandomMovie();
            const ctx: Context = {} as Context;
            const id = "someId";
            ctx.params = {id};
            when(movieService.findById(id)).thenReturn(movie);

            const value = controllerUnderTest.findMovieById(ctx, nextFunction);

            verify(movieService.findById(id)).called();
            expect(ctx.body).to.equal(movie);
        });

        it("return with a 404 if no movie is found", () => {
            const id = "someId";
            const errorMessage = "No movie found with ID.";
            const ctx: Context = {
                params: {id},
                throw: () => null,
            } as Context;
            when(movieService.findById(id)).thenThrow(new Error(errorMessage));
            const ctxMock = sinon.mock(ctx);
            ctxMock.expects("throw").calledWithExactly(404, errorMessage);

            controllerUnderTest.findMovieById(ctx, nextFunction);

            ctxMock.verify();
        });
    });

    describe("addMovie", () => {

        it("delegates to movieService and responds with 200", () => {
            const resultMovie = createRandomMovie();
            const movieRequestObject = createRandomMovieRequestObject();
            when(movieService.addMovie(
                movieRequestObject.title,
                movieRequestObject.duration,
                movieRequestObject.releaseYear,
                movieRequestObject.directorId,
                movieRequestObject.rating,
                movieRequestObject.seen))
                .thenReturn(resultMovie);
            const ctx: Context = {request: {}} as Context;
            ctx.request.body = movieRequestObject;

            controllerUnderTest.addMovie(ctx, nextFunction);

            expect(ctx.body).to.equal(resultMovie);
        });

    });

});
