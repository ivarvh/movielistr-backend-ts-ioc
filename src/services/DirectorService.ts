import IDUtils from './../utils/IDUtils';
import { Singleton, Inject } from 'typescript-ioc';

import Director from "../models/Director";

@Singleton
export default class DirectorService {

    constructor( @Inject private idUtils: IDUtils) { }

    private directors: Array<Director> = [
        Director.newDirector(this.idUtils.generateUniqueId(), "Robert", "Rodriguez", 1968),
        Director.newDirector(this.idUtils.generateUniqueId(), "Quentin", "Tarantino", 1963),
        Director.newDirector(this.idUtils.generateUniqueId(), "John", "Lasseter", 1957),
        Director.newDirector(this.idUtils.generateUniqueId(), "Toby", "Hooper", 1943)
    ];

    public findById(id: string): Director {
        const result = this.directors.find(director => director.$id === id);
        if (!result) {
            throw new Error("There is no director with this ID");
        }
        return result;
    }

    public findAll(): Array<Director> {
        return this.directors;
    }

    public addDirector(firstName: string, lastName: string, birthYear: number) {
        const newDirector = Director.newDirector(this.idUtils.generateUniqueId(), firstName, lastName, birthYear);
        this.directors.push(newDirector);
        return newDirector;
    }

    public updateDirector(id: string, firstName: string, lastName: string, birthYear: number) {
        const currentValue: Director = this.findById(id);
        currentValue.$firstName = firstName;
        currentValue.$lastName = lastName;
        currentValue.$birthYear = birthYear;
        return currentValue;
    }
}