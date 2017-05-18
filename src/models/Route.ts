import { IMiddleware } from 'koa-router';
export default class Route {

    private path: string;
    private method: string;
    private action: IMiddleware;

    public static newRoute(path: string, method: string, action: IMiddleware) {
        const route = new Route();
        route.path = path;
        route.method = method;
        route.action = action;
        return route;
    }

    public get $path(): string {
        return this.path;
    }

    public get $method(): string {
        return this.method;
    }

    public get $action(): IMiddleware {
        return this.action;
    }
}