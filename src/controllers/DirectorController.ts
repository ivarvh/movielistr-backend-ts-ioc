import { Inject, Singleton } from 'typescript-ioc';
import { Context } from 'koa';
import { IRouterContext, IMiddleware } from 'koa-router';
import DirectorService from "../services/DirectorService";

@Singleton
export default class DirectorController {

    @Inject
    private directorService: DirectorService;

    constructor() { }

    public getAllDirectors: IMiddleware = (ctx: IRouterContext, next: () => Promise<any>) => {
        ctx.body = this.directorService.findAll();
    }

    public findDirectorById: IMiddleware = (ctx: IRouterContext, next: () => Promise<any>) => {
        this.directorService.findById(ctx.params.id);
    }
}