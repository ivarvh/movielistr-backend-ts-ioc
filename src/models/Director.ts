import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Director {

    @PrimaryGeneratedColumn()
    private id: number;
    @Column()
    private firstName: string;
    @Column()
    private lastName: string;
    @Column()
    private birthYear: number;

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
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

    public static newDirector(obj: { id?: number, firstName?: string, lastName?: string, birthYear?: number }) {
        const newDirector = new Director();
        if (obj.id) newDirector.id = obj.id;
        if (obj.firstName) newDirector.firstName = obj.firstName;
        if (obj.lastName) newDirector.lastName = obj.lastName;
        if (obj.birthYear) newDirector.birthYear = obj.birthYear;
        return newDirector;
    }

}
