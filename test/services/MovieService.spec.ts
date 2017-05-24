import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import "sinon-chai";
import { instance, mock, verify, when } from "ts-mockito";

import Director from "../../src/models/Director";
import Movie from "../../src/models/Movie";
import DirectorService from "../../src/services/DirectorService";
import MovieService from "../../src/services/MovieService";
import IDUtils from "../../src/utils/IDUtils";

describe("MovieService", () => {

    let serviceUnderTest: MovieService;
    let directorService: DirectorService;

    const directorId = "uniqueId";
    const director: Director = Director.newDirector(directorId, "John", "Johnson", 1965);

    beforeEach(() => {
        const idUtils = new IDUtils();
        directorService = mock(DirectorService);

        when(directorService.findById(directorId)).thenReturn(director);

        serviceUnderTest = new MovieService(
            instance(directorService),
            idUtils,
        );
    });

    describe("findAll", () => {

        it("should return all the movies", () => {
            serviceUnderTest.addMovie("title", 100, 1986, directorId, 5, true);
            const actual: Movie[] = serviceUnderTest.findAll();
            expect(actual).to.have.length(1);
            // tslint:disable-next-line:no-unused-expression
            expect(actual[0].$id).to.not.be.null;
            expect(actual[0].$title).to.equal("title");
            expect(actual[0].$duration).to.equal(100);
            expect(actual[0].$releaseYear).to.equal(1986);
            expect(actual[0].$rating).to.equal(5);
            // tslint:disable-next-line:no-unused-expression
            expect(actual[0].$seen).to.be.true;
            expect(actual[0].$director).to.equal(director);
        });

    });

    describe("findById", () => {
        it("should return the movie with given ID", () => {
            const movie = serviceUnderTest.addMovie("title", 100, 1986, directorId, 5, true);
            const actual: Movie = serviceUnderTest.findById(movie.$id);
            expect(actual.$title).to.equal("title");
            expect(actual.$duration).to.equal(100);
            expect(actual.$releaseYear).to.equal(1986);
            expect(actual.$rating).to.equal(5);
            // tslint:disable-next-line:no-unused-expression
            expect(actual.$seen).to.be.true;
            expect(actual.$director).to.equal(director);
        });

        it("should throw error if no movie is found", () => {
            expect(() => serviceUnderTest.findById("nonexistantID")).to.throw("No movie found with ID");
        });
    });

    describe("addMovie", () => {
        it("should add the given movie", () => {
            const movie = serviceUnderTest.addMovie("title", 100, 1986, directorId, 5, true);
            const actual: Movie = serviceUnderTest.findById(movie.$id);
            expect(actual.$title).to.equal("title");
            expect(actual.$duration).to.equal(100);
            expect(actual.$releaseYear).to.equal(1986);
            expect(actual.$rating).to.equal(5);
            // tslint:disable-next-line:no-unused-expression
            expect(actual.$seen).to.be.true;
            expect(actual.$director).to.equal(director);
        });

        it("should throw an error if an non existing director id is passed", () => {
            when(directorService.findById(directorId)).thenThrow(new Error("There is no director with this ID"));
            expect(() => serviceUnderTest.addMovie("title", 100, 1986, directorId, 5, true)).to.throw("There is no director with this ID");
        });
    });

    describe("updateMovie", () => {

        it("should edit the movie", () => {
            const movie = serviceUnderTest.addMovie("title", 100, 1986, directorId, 5, true);
            serviceUnderTest.updateMovie(movie.$id, "300", 96, 2007, directorId, 9, false);
            const actual: Movie = serviceUnderTest.findById(movie.$id);
            expect(actual.$title).to.equal("300");
            expect(actual.$duration).to.equal(96);
            expect(actual.$releaseYear).to.equal(2007);
            expect(actual.$rating).to.equal(9);
            // tslint:disable-next-line:no-unused-expression
            expect(actual.$seen).to.be.false;
            expect(actual.$director).to.equal(director);
        });

        it("should throw an error if no director is found for Id", () => {
            const nonExistentDirectorId = "nonexistantdirectorId";
            const movie = serviceUnderTest.addMovie("title", 100, 1986, directorId, 5, true);
            when(directorService.findById(nonExistentDirectorId)).thenThrow(new Error("There is no director with this ID"));
            expect(() => serviceUnderTest.updateMovie(movie.$id, "title", 100, 1986, nonExistentDirectorId, 5, true)).to.throw("There is no director with this ID");
        });

        it("should throw an error if no movie is found for Id", () => {
            expect(() => serviceUnderTest.updateMovie("non existing ID", "title", 100, 1986, directorId, 5, true)).to.throw("No movie found with ID");
        });
    });

});
