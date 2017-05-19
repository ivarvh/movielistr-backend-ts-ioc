import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import {Mock} from "typemoq";
import MovieController from "../../src/controllers/MovieController";
import Director from "../../src/models/Director";
import Movie from "../../src/models/Movie";
import DirectorService from "../../src/services/DirectorService";
import MovieService from "../../src/services/MovieService";
import IDUtils from "../../src/utils/IDUtils";
import { createListOfRandomMovies, createRandomMovie } from "./../testutils/MovieTestBuilder";

describe("MovieController", () => {

    let controllerUnderTest: MovieController;
    let movieService: MovieService;
    const nextFunction = () => Promise.resolve();

    beforeEach(() => {
        movieService = createMock<MovieService>(MovieService);
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

    });

});

function createMock<T>(clazz: any): T {
    const mock: any = {};
    clazz = new clazz();
    const objProps = props(clazz);
    for (const member in objProps) {
        if (typeof clazz[objProps[member]] === "function") {
            mock[objProps[member]] = () => null;
        } else {
            mock[objProps[member]] = null;
        }
    }
    return mock as T;
}

function props(obj: any): string[] {
    const p: string[] = [];
    for (; obj != null; obj = Object.getPrototypeOf(obj)) {
        const op = Object.getOwnPropertyNames(obj);
        op.forEach((element) => {
            if (p.indexOf(element) === -1) {
                p.push(element);
            }
        });
    }
    return p;
}
