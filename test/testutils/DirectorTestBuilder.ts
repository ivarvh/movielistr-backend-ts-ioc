import Director from "../../src/models/Director";

export default class DirectorTestBuilder {

    private director: Director;

    constructor() {
        this.director = new Director();
    }

    public static newDirector(): DirectorTestBuilder {
        return new DirectorTestBuilder();
    }

    public withFirstName(firstName: string): DirectorTestBuilder {
        this.director.$firstName = firstName;
        return this;
    }
    public withLastName(lastName: string): DirectorTestBuilder {
        this.director.$lastName = lastName;
        return this;
    }
    public withBirthYear(birthYear: number): DirectorTestBuilder {
        this.director.$birthYear = birthYear;
        return this;
    }

    public withId(id: number): DirectorTestBuilder {
        this.director.$id = id;
        return this;
    }

    public withRandomId(): DirectorTestBuilder {
        this.director.$id = Math.random() * 10;
        return this;
    }

    public withDefaultValues(): DirectorTestBuilder {
        return this
            .withFirstName("John")
            .withLastName("Lasseter")
            .withBirthYear(1966);
    }

    public build(): Director {
        return this.director;
    }

    public static getListOfDefaultDirectors(length: number): Director[] {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(DirectorTestBuilder.newDirector().withDefaultValues().build());
        }
        return result;
    }

}
