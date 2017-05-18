import { generateUniqueId } from './../utils/IDUtils';
import { Singleton } from 'typescript-ioc';

import Director from "../models/Director";

@Singleton
export default class DirectorService {

    private directors: Array<Director> = [
        Director.newDirector(generateUniqueId(), "Robert", "Rodriguez", 1968),
        Director.newDirector(generateUniqueId(), "Quentin", "Tarantino", 1963),
        Director.newDirector(generateUniqueId(), "John", "Lasseter", 1957),
        Director.newDirector(generateUniqueId(), "Toby", "Hooper", 1943)
    ];

    constructor() {
    }

    public findById(id: string): Director {
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