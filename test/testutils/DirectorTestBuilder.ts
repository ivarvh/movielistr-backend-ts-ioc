import Director from "../../src/models/Director";

export const createRandomDirector = (): Director => {
    return Director.newDirector("" + Math.random(), "firstName", "lastName", 1990);
};

export const createListOfRandomDirectors = (size: number): Director[] => {
    const result = [];
    for (let i = 0; i < size; i++) {
        result.push(createRandomDirector());
    }
    return result;
};
