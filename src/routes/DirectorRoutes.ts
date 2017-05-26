import { Container } from "typescript-ioc";
import DirectorController from "../controllers/DirectorController";
import Route from "../models/Route";

const directorRoutes = () => {
    const directorController: DirectorController = Container.get(DirectorController);
    return [
        Route.newRoute("/directors", "get", directorController.getAllDirectors),
        Route.newRoute("/directors/:id", "get", directorController.findDirectorById),
        Route.newRoute("/directors/:id", "delete", directorController.deleteDirector),
        Route.newRoute("/directors/", "post", directorController.saveDirector),
        Route.newRoute("/directors/:id", "put", directorController.saveDirector),
    ];
};

export default directorRoutes;
