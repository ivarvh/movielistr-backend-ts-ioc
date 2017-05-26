import { expect } from "chai";
import "mocha";

import { instance, mock, verify, when } from "ts-mockito/lib/ts-mockito";
import Director from "../../src/models/Director";
import DirectorRepository from "../../src/repositories/DirectorRepository";
import DirectorService from "../../src/services/DirectorService";
import DirectorTestBuilder from "../testutils/DirectorTestBuilder";

describe("DirectorService", () => {

    let serviceUnderTest: DirectorService;
    let directorRepository: DirectorRepository;

    const testId = 80085;
    const testDirectorList = DirectorTestBuilder.getListOfDefaultDirectors(5);
    const testDirectorWithId = DirectorTestBuilder.newDirector().withDefaultValues().withId(testId).build();
    const testDirectorWithoutId = DirectorTestBuilder.newDirector().withDefaultValues().build();

    beforeEach(() => {
        directorRepository = mock(DirectorRepository);
        serviceUnderTest = new DirectorService(
            instance(directorRepository),
        );
    });

    describe("findAll", () => {

        it("should return the 4 dummy directors", async () => {
            when(directorRepository.getAllDirectors()).thenReturn(Promise.resolve(testDirectorList));
            const actual = await serviceUnderTest.findAll();
            expect(actual).to.have.length(5);
        });
    });

    describe("findById", () => {

        it("should return the director with given Id if the director exists", async () => {
            when(directorRepository.findDirectorById(testId)).thenReturn(Promise.resolve(testDirectorWithId));
            const actual = await serviceUnderTest.findById(testId);
            expect(actual).to.equal(testDirectorWithId);
        });

    });

    describe("saveDirector", () => {

        it("should add a director with the given information", async () => {
            when(directorRepository.saveDirector(testDirectorWithoutId)).thenReturn(Promise.resolve(testDirectorWithId));
            const actual = await serviceUnderTest.save(testDirectorWithoutId);
            expect(actual).to.equal(testDirectorWithId);
        });

    });

    describe("deleteDirector", () => {

        it("should call the delete on the repository", async () => {
            when(directorRepository.deleteDirectorWithId(testId)).thenReturn(Promise.resolve());
            await serviceUnderTest.delete(testId);
            verify(directorRepository.deleteDirectorWithId(testId)).called();
        });

    });

});
