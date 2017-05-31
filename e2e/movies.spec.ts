import { expect } from "chai";
import { Server } from "http";
import * as Koa from "koa";
import "mocha";
import * as sinon from "sinon";
import { agent } from "supertest";
import { instance, mock, verify, when } from "ts-mockito";
import { Container } from "typescript-ioc";
import Movie from "../src/models/Movie";
import MovieListr from "../src/MovieListr";
import DirectorTestBuilder from "../test/testutils/DirectorTestBuilder";
import MovieTestBuilder from "../test/testutils/MovieTestBuilder";

describe("E2E: Movie Actions", () => {

    let app: Server;

    const title: string = "Spongebob Squarepants Movie";
    const rating = 7;
    const duration = 84;
    const releaseYear = 2008;
    const seen = true;
    const directorId = 3;
    const directorFirstName = "John";
    const directorLastName = "Lasseter";
    const directorBirthYear = 1957;
    const director = () => DirectorTestBuilder.newDirector()
        .withId(3)
        .withFirstName(directorFirstName)
        .withLastName(directorLastName)
        .withBirthYear(directorBirthYear);

    before(async () => {
        const movielistr: MovieListr = Container.get(MovieListr);
        app = await movielistr.start();
    });

    describe("GET /movies", () => {

        it("returns a list of all movies", async () => {
            const response = await agent(app)
                .get("/movies")
                .accept("json")
                .expect(200);

            const result: Movie[] = response.body;
            expect(result).to.have.length(4);
        });
    });

    describe("GET /movies/:id", () => {

        it("should return the specific movie", async () => {
            const response = await agent(app)
                .get("/movies/1")
                .accept("json")
                .expect(200);

            const result = response.body;
            expect(result.id).to.equal(1);
            expect(result.title).to.equal("Finding Nemo");
            expect(result.rating).to.equal(7);
            expect(result.releaseYear).to.equal(2008);
            expect(result.duration).to.equal(100);
            expect(result.director.id).to.equal(3);
            expect(result.director.firstName).to.equal("John");
            expect(result.director.lastName).to.equal("Lasseter");
            expect(result.director.birthYear).to.equal(1957);
        });

        it("should return a 404 when the movie with id doesn't exist", async () => {
            const response = await agent(app)
                .get("/movies/999")
                .accept("json")
                .expect(404);
        });

    });

    describe("POST /movies", () => {

        it("should add the movie", async () => {
            const response = await agent(app)
                .post("/movies")
                .accept("json")
                .send(MovieTestBuilder
                    .newMovie()
                    .withTitle(title)
                    .withRating(rating)
                    .withDuration(duration)
                    .withReleaseYear(releaseYear)
                    .withSeen(seen)
                    .withDirector(director().build())
                    .build(),
            ).expect(200);

            const result = response.body;
            expect(result.id).is.greaterThan(0);
        });

        it("should return 400 if the director does not exist yet", async () => {
            await agent(app)
                .post("/movies")
                .accept("json")
                .send(MovieTestBuilder
                    .newMovie()
                    .withTitle(title)
                    .withRating(rating)
                    .withDuration(duration)
                    .withReleaseYear(releaseYear)
                    .withSeen(seen)
                    .withDirector(director().withId(999).build())
                    .build(),
            ).expect(400);
        });
    });

    describe("PUT /movies/:id", () => {

        it("should update the movie with given ID", async () => {
            const movieResponse = await agent(app)
                .get("/movies")
                .accept("json")
                .expect(200);
            const allMovies = movieResponse.body;
            const movieId = allMovies[0].id;

            const response = await agent(app)
                .put(`/movies/${movieId}`)
                .accept("json")
                .send(MovieTestBuilder
                    .newMovie()
                    .withId(movieId)
                    .withTitle(title)
                    .withRating(rating)
                    .withDuration(duration)
                    .withReleaseYear(releaseYear)
                    .withSeen(seen)
                    .withDirector(director().build())
                    .build(),
            ).expect(200);

            const result = response.body;
            expect(result.id).to.equal(1);
            expect(result.title).to.equal(title);
            expect(result.rating).to.equal(rating);
            expect(result.duration).to.equal(duration);
            expect(result.releaseYear).to.equal(releaseYear);
            expect(result.seen).to.equal(seen);
            expect(result.director.id).to.equal(directorId);
            expect(result.director.firstName).to.equal(directorFirstName);
            expect(result.director.lastName).to.equal(directorLastName);
            expect(result.director.birthYear).to.equal(directorBirthYear);
        });

        it("should return 400 if the movie does not exist yet", async () => {
            await agent(app)
                .put("/movies/99")
                .accept("json")
                .send(MovieTestBuilder
                    .newMovie()
                    .withId(99)
                    .withTitle(title)
                    .withRating(rating)
                    .withDuration(duration)
                    .withReleaseYear(releaseYear)
                    .withSeen(seen)
                    .withDirector(director().build())
                    .build(),
            ).expect(400);
        });

        it("should return 400 if the id of the request object does not match the url id", async () => {
            await agent(app)
                .put("/movies/10")
                .accept("json")
                .send(MovieTestBuilder
                    .newMovie()
                    .withId(5)
                    .withTitle(title)
                    .withRating(rating)
                    .withDuration(duration)
                    .withReleaseYear(releaseYear)
                    .withSeen(seen)
                    .withDirector(director().build())
                    .build(),
            ).expect(400);
        });
    });

    describe("DELETE /movies/:id", () => {

        it("should delete the movie with the given type", async () => {
            const movieResponse = await agent(app)
                .get("/movies")
                .accept("json")
                .expect(200);
            const currentMovies = movieResponse.body;
            const movieId = currentMovies[0].id;

            await agent(app)
                .delete(`/movies/${movieId}`)
                .accept("json")
                .expect(200);

            const response = await agent(app)
                .get("/movies")
                .accept("json")
                .expect(200);

            const allMovies: Movie[] = response.body;

            allMovies.forEach((element) => {
                expect(element.$id).not.to.equal(movieId);
            });
        });

        it("should return a 404 if the movie does not exist (anymore)", async () => {
            await agent(app)
                .delete("/movies/999")
                .accept("json")
                .expect(404);
        });

    });

});
