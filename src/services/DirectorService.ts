import { Inject, Singleton } from "typescript-ioc";

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

    public async delete(directorId: number) {
        return this.directorRepository.deleteDirectorWithId(directorId);
    }
}
