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
                    .withTitle("Spongebob Squarepants Movie")
                    .withRating(7)
                    .withDuration(84)
                    .withReleaseYear(2008)
                    .withSeen(true)
                    .withDirector(DirectorTestBuilder.newDirector()
                        .withId(3)
                        .withFirstName("John")
                        .withLastName("Lasseter")
                        .withBirthYear(1957)
                        .build())
                    .build(),
            ).expect(200);

            const result = response.body;
            expect(result.id).is.greaterThan(0);
        });

    });

});
