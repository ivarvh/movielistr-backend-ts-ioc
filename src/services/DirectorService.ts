import { Singleton } from 'typescript-ioc';

import Director from "../models/Director";

@Singleton
export default class DirectorService {

    private directors: Array<Director> = [
        Director.newDirector(1, "Robert", "Rodriguez", 1968),
        Director.newDirector(2, "Quentin", "Tarantino", 1963),
        Director.newDirector(3, "John", "Lasseter", 1957),
        Director.newDirector(4, "Toby", "Hooper", 1943)
    ];

    constructor() {
    }

    public findById(id: number): Director {
        const result = this.directors.find(director => director.$id === id);
        if (!result) {
            throw new Error("There is no director with this ID");
        }
        return result;
    }

    public findAll() {
        return this.directors;
    }
}