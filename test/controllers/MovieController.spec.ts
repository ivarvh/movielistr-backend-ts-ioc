import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import Mox from "ts-mox";
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
        movieService = Mox.createMock<MovieService>(MovieService);
        controllerUnderTest = new MovieController(movieService);
    });

    describe("getAllMovies", () => {

        it("puts the movies on the body", () => {
            const movies = createListOfRandomMovies(5);
            movieService.findAll = () => movies;
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
            const findByIdMock = sinon.mock(movieService);
            findByIdMock.expects("findById").returns(movie);
            const value = controllerUnderTest.findMovieById(ctx, nextFunction);
            findByIdMock.verify();
            expect(ctx.body).to.equal(movie);
        });
    });

    describe("addMovie", () => {

        it("delegates to movieService and responds with 200", () => {
            const resultMovie = createRandomMovie();
            const movieRequestObject = createRandomMovieRequestObject();
            const movieServiceMock = sinon.mock(movieService);
            movieServiceMock
            .expects("addMovie")
            .returns(resultMovie)
            .calledWith(
                movieRequestObject.title,
                movieRequestObject.duration,
                movieRequestObject.releaseYear,
                movieRequestObject.directorId,
                movieRequestObject.rating,
                movieRequestObject.seen);
            const ctx: Context = {request: {}} as Context;
            ctx.request.body = movieRequestObject;
            controllerUnderTest.addMovie(ctx, nextFunction);
            expect(ctx.body).to.equal(resultMovie);
            movieServiceMock.verify();

        });

    });

});
