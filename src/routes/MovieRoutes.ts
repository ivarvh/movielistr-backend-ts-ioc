import { Container } from "typescript-ioc";
import MovieController from "../controllers/MovieController";
import Route from "../models/Route";

const movieRoutes = () => {
    const movieController: MovieController = Container.get(MovieController);
    return [
        Route.newRoute("/movies", "get", movieController.getAllMovies),
        Route.newRoute("/movies/:id", "get", movieController.findMovieById),
        Route.newRoute("/movies", "post", movieController.saveMovie),
        Route.newRoute("/movies/:id", "put", movieController.saveMovie),
        Route.newRoute("/movies/:id", "delete", movieController.deleteMovie),
    ];
};

export default movieRoutes;
