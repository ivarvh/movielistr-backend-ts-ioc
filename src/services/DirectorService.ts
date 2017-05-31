import { Inject, Singleton } from "typescript-ioc";

import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Director from "../models/Director";
import DirectorRepository from "../repositories/DirectorRepository";

@Singleton
export default class DirectorService {

    constructor( @Inject private directorRepository: DirectorRepository) { }

    public async findById(id: number): Promise<Director> {
        return this.directorRepository.findDirectorById(id);
    }

    public async findAll(): Promise<Director[]> {
        return this.directorRepository.getAllDirectors();
    }

    public async save(director: Director): Promise<Director> {
        return this.directorRepository.saveDirector(director);
    }

    public async update(director: Director) {
        try {
            await this.directorRepository.findDirectorById(director.$id);
            return this.directorRepository.saveDirector(director);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity("The given director does not exist yet.");
            }
        }
    }

    public async delete(directorId: number) {
        return this.directorRepository.deleteDirectorWithId(directorId);
    }
}
