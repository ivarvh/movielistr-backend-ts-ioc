import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import { anything, capture, instance, mock, verify, when } from "ts-mockito";
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
            const requestBody = {
                title: movieWithoutId.$title,
                releaseYear: movieWithoutId.$releaseYear,
                duration: movieWithoutId.$duration,
                rating: movieWithoutId.$rating,
                seen: movieWithoutId.$seen,
                director: {
                    id: movieWithoutId.$director.$id,
                    firstName: movieWithoutId.$director.$firstName,
                    lastName: movieWithoutId.$director.$lastName,
                    birthYear: movieWithoutId.$director.$birthYear,
                },
            };
            ctx.request.body = requestBody;

            when(movieService.save(anything()))
                .thenReturn(Promise.resolve(movieWithId));

            await controllerUnderTest.saveMovie(ctx);

            const [firstArg] = capture(movieService.save).last();
            console.log(JSON.stringify(firstArg));
            expect(firstArg.$id).equals(undefined);
            expect(firstArg.$title).equals(requestBody.title);
            expect(firstArg.$releaseYear).equals(requestBody.releaseYear);
            expect(firstArg.$duration).equals(requestBody.duration);
            expect(firstArg.$rating).equals(requestBody.rating);
            expect(firstArg.$seen).equals(requestBody.seen);
            expect(firstArg.$director.$id).equals(requestBody.director.id);
            expect(firstArg.$director.$firstName).equals(requestBody.director.firstName);
            expect(firstArg.$director.$lastName).equals(requestBody.director.lastName);
            expect(firstArg.$director.$birthYear).equals(requestBody.director.birthYear);

            expect(ctx.body).to.equal(movieWithId);
        });

    });

});
