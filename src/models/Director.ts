export default class Director {

    private id: number;
    private firstName: string;
    private lastName: string;
    private birthYear: number;

    public static newDirector(id: number, firstName: string, lastName: string, birthYear: number) {
        const newDirector = new Director();
        newDirector.id = id;
        newDirector.firstName = firstName;
        newDirector.lastName = lastName;
        newDirector.birthYear = birthYear;
        return newDirector;
    }

    public get $id(): number {
        return this.id;
    }

    public get $firstName(): string {
        return this.firstName;
    }

    public set $firstName(value: string) {
        this.firstName = value;
    }

    public get $lastName(): string {
        return this.lastName;
    }

    public set $lastName(value: string) {
        this.lastName = value;
    }

    public get $birthYear(): number {
        return this.birthYear;
    }

    public set $birthYear(value: number) {
        this.birthYear = value;
    }
}