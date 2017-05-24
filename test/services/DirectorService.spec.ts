import { expect } from "chai";
import "mocha";

import Director from "../../src/models/Director";
import DirectorService from "../../src/services/DirectorService";
import IDUtils from "../../src/utils/IDUtils";

describe("DirectorService", () => {

    let serviceUnderTest: DirectorService;

    beforeEach(() => {
        serviceUnderTest = new DirectorService(
            new IDUtils(),
        );
    });

    describe("findAll", () => {

        it("should return the 4 dummy directors", () => {
            const actual = serviceUnderTest.findAll();
            expect(actual).to.have.length(4);
        });
    });

    describe("findById", () => {

        it("should return the director with given Id if the director exists", () => {
            const newDirector = serviceUnderTest.addDirector("John", "Johnson", 1985);
            const actual = serviceUnderTest.findById(newDirector.$id);
            expect(actual).to.equal(newDirector);
        });

        it("should throw Error if the given Id does not exist", () => {
            expect(() => serviceUnderTest.findById("nonexistantId")).to.throw("There is no director with this ID");
        });
    });

    describe("addDirector", () => {

        it("should add a director with the given information", () => {
            const newDirector = serviceUnderTest.addDirector("John", "Johnson", 1985);
            const actual = serviceUnderTest.findById(newDirector.$id);
            expect(actual).to.equal(newDirector);
        });

    });

    describe("updateDirector", () => {

        it("updates the director with the given Id", () => {
            const newDirector = serviceUnderTest.addDirector("John", "Johnson", 1985);
            serviceUnderTest.updateDirector(newDirector.$id, "Mark", "Markson", 1987);
            const updatedDirector = serviceUnderTest.findById(newDirector.$id);
            expect(updatedDirector.$id).to.equal(newDirector.$id);
            expect(updatedDirector.$firstName).to.equal(newDirector.$firstName);
            expect(updatedDirector.$lastName).to.equal(newDirector.$lastName);
            expect(updatedDirector.$birthYear).to.equal(newDirector.$birthYear);
        });

        it("should throw Error if the given Id does not exist", () => {
            expect(() => serviceUnderTest.updateDirector("nonexistantId", "Mark", "Markson", 1965)).to.throw("There is no director with this ID");
        });

    });

});
