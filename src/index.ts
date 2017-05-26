
import "reflect-metadata";

import { Container } from "typescript-ioc";

import MovieListr from "./MovieListr";

const app: MovieListr = Container.get(MovieListr);
app.start();
