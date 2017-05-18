import { Container } from 'typescript-ioc';
import Route from "../models/Route";
import MovieController from "../controllers/MovieController";

const movieRoutes = () => {
    const movieController = Container.get(MovieController);
    return [
        Route.newRoute("/movies", "get", movieController.getAllMovies),
        Route.newRoute("/movies/:id", "get", movieController.findMovieById),
        Route.newRoute("/movies", "post", movieController.addMovie),
    ]
};

export default movieRoutes;