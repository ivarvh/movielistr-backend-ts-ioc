import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import { instance, mock, verify, when } from "ts-mockito";
import MovieController from "../../src/controllers/MovieController";
import Director from "../../src/models/Director";
import Movie from "../../src/models/Movie";
import DirectorService from "../../src/services/DirectorService";
import MovieService from "../../src/services/MovieService";
import MovieTestBuilder from "../testutils/MovieTestBuilder";

describe("MovieController", () => {

    let controllerUnderTest: MovieController;
    let movieService: MovieService;

    const testId = 80085;
    const movieWithId: Movie = MovieTestBuilder.newMovie().withDefaultValues().withId(testId).build();
    const movieWithoutId: Movie = MovieTestBuilder.newMovie().withDefaultValues().build();

    beforeEach(() => {
        movieService = mock(MovieService);
        controllerUnderTest = new MovieController(instance(movieService));
    });

    describe("getAllMovies", () => {

        it("puts the movies on the body", async () => {
            const movies = MovieTestBuilder.createListOfDefaultMovies(5);
            when(movieService.findAll()).thenReturn(Promise.resolve(movies));
            const ctx: Context = {} as Context;

            await controllerUnderTest.getAllMovies(ctx);

            expect(ctx.body).to.equal(movies);
        });
    });

    describe("findMovieById", () => {

        it("puts the found the found movie on the body", async () => {
            const ctx: Context = {} as Context;
            ctx.params = { id: testId };
            when(movieService.findById(testId)).thenReturn(Promise.resolve(movieWithId));

            await controllerUnderTest.findMovieById(ctx);

            verify(movieService.findById(testId)).called();
            expect(ctx.body).to.equal(movieWithId);
        });

        it("return with a 404 if no movie is found", async () => {
            const errorMessage = "No movie found with ID.";
            const ctx: Context = {
                params: { id: testId },
                throw: () => null,
            } as Context;
            when(movieService.findById(testId)).thenThrow(new Error(errorMessage));
            const ctxMock = sinon.mock(ctx);
            ctxMock.expects("throw").calledWithExactly(404, errorMessage);

            await controllerUnderTest.findMovieById(ctx);

            ctxMock.verify();
        });
    });

    describe("saveMovie", () => {

        it("delegates to movieService and responds with 200", async () => {
            const ctx: Context = { request: {} } as Context;
            ctx.request.body = movieWithoutId;

            when(movieService.saveMovie(movieWithoutId))
                .thenReturn(Promise.resolve(movieWithId));

            await controllerUnderTest.saveMovie(ctx);

            expect(ctx.body).to.equal(movieWithId);
        });

    });

});
