import DirectorController from '../controllers/DirectorController';
import Route from "../models/Route";
import { Container } from "typescript-ioc";

const directorRoutes = () => {
    const directorController = Container.get(DirectorController);
    return [
        Route.newRoute("/directors", "get", directorController.getAllDirectors),
        Route.newRoute("/directors/:id", "get", directorController.findDirectorById)
    ]
};

export default directorRoutes;