import { getEntityManager } from "typeorm";
import Director from "../models/Director";
import Movie from "../models/Movie";

export default abstract class IRepository {

    protected getDirectorRepository() {
        return getEntityManager().getRepository(Director);
    }

    protected getMovieRepository() {
        return getEntityManager().getRepository(Movie);
    }

}
