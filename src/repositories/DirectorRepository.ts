import { FindOptions, getEntityManager, Repository } from "typeorm";
import { Inject, Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Director from "../models/Director";
import Movie from "../models/Movie";
import IRepository from "../repositories/IRepository";
import MovieRepository from "./MovieRepository";

@Singleton
export default class DirectorRepository extends IRepository {

    constructor( @Inject private movieRepository: MovieRepository) {
        super();
    }

    public async getAllDirectors(): Promise<Director[]> {
        return this.getDirectorRepository().find();
    }

    public async findDirectorById(id: number): Promise<Director> {
        const result = await this.getDirectorRepository().findOneById(id);
        if (!result) {
            throw new EntityNotFoundError("No director was found for ID: " + id);
        }
        return result;
    }

    public async saveDirector(director: Director): Promise<Director> {
        return this.getDirectorRepository().persist(director);
    }

    public async deleteDirectorWithId(id: number) {
        await this.movieRepository.deleteMoviesFromDirector(id);
        await this.getDirectorRepository()
            .createQueryBuilder("director")
            .delete()
            .where("director.id = :id", { id })
            .execute();
        return Promise.resolve();
    }
}
