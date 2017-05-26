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

    public static newDirector(firstName: string, lastName: string, birthYear: number) {
        const newDirector = new Director();
        newDirector.firstName = firstName;
        newDirector.lastName = lastName;
        newDirector.birthYear = birthYear;
        return newDirector;
    }

}
